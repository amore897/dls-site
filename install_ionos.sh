#!/bin/bash

# 🚀 DLS Website - Автоматическая установка на IONOS VPS
# Этот скрипт установит всё необходимое за 5-10 минут

set -e

echo "======================================"
echo "🚀 DLS Website - Автоматическая установка"
echo "======================================"
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функция для вывода
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Проверка root прав
if [[ $EUID -ne 0 ]]; then
   print_error "Этот скрипт должен быть запущен с правами root!"
   echo "Используйте: sudo bash install_ionos.sh"
   exit 1
fi

# Запрос данных у пользователя
echo ""
echo "Введите данные для настройки:"
echo ""
read -p "Ваш домен (например: dls-ai.io): " DOMAIN
read -p "Ваш email для SSL сертификата: " EMAIL
read -p "URL вашего GitHub репозитория (например: https://github.com/username/dls-website): " GITHUB_REPO

echo ""
echo "======================================"
echo "Начинаю установку..."
echo "Это займёт 5-10 минут"
echo "======================================"
echo ""

# 1. Обновление системы
echo "📦 Обновление системы..."
apt update -y > /dev/null 2>&1
apt upgrade -y > /dev/null 2>&1
print_success "Система обновлена"

# 2. Установка базовых утилит
echo "🔧 Установка базовых утилит..."
apt install -y curl wget git ufw > /dev/null 2>&1
print_success "Базовые утилиты установлены"

# 3. Установка Node.js
echo "📦 Установка Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
apt install -y nodejs > /dev/null 2>&1
npm install -g yarn pm2 > /dev/null 2>&1
print_success "Node.js $(node -v) установлен"

# 4. Установка Python
echo "🐍 Установка Python..."
apt install -y python3 python3-pip python3-venv > /dev/null 2>&1
print_success "Python $(python3 --version) установлен"

# 5. Установка MongoDB
echo "🗄️  Установка MongoDB..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor > /dev/null 2>&1
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
apt update > /dev/null 2>&1
apt install -y mongodb-org > /dev/null 2>&1
systemctl start mongod
systemctl enable mongod > /dev/null 2>&1
print_success "MongoDB установлен и запущен"

# 6. Установка Nginx
echo "🌐 Установка Nginx..."
apt install -y nginx > /dev/null 2>&1
systemctl start nginx
systemctl enable nginx > /dev/null 2>&1
print_success "Nginx установлен и запущен"

# 7. Клонирование репозитория
echo "📥 Клонирование кода с GitHub..."
cd /var/www
if [ -d "dls-website" ]; then
    rm -rf dls-website
fi
git clone $GITHUB_REPO dls-website > /dev/null 2>&1
print_success "Код загружен"

# 8. Настройка Backend
echo "⚙️  Настройка Backend..."
cd /var/www/dls-website/backend

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt > /dev/null 2>&1

# Проверка наличия .env, если нет - создаем шаблон
if [ ! -f .env ]; then
    cat > .env << EOF
MONGO_URL="mongodb://localhost:27017"
DB_NAME="dls_database"
CORS_ORIGINS="*"
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
EOF
    print_warning "Создан файл .env - ДОБАВЬТЕ STRIPE КЛЮЧИ!"
fi

# Запуск backend через PM2
pm2 delete dls-backend 2>/dev/null || true
pm2 start "$(pwd)/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001" --name dls-backend > /dev/null 2>&1
pm2 save > /dev/null 2>&1
pm2 startup systemd -u root --hp /root > /dev/null 2>&1
print_success "Backend настроен и запущен"

# 9. Настройка Frontend
echo "🎨 Настройка Frontend..."
cd /var/www/dls-website/frontend

# Создание .env файла
cat > .env << EOF
REACT_APP_BACKEND_URL=https://$DOMAIN
EOF

# Установка зависимостей
yarn install > /dev/null 2>&1

# Сборка
yarn build > /dev/null 2>&1
print_success "Frontend собран"

# 10. Настройка Nginx
echo "🔧 Настройка Nginx..."
cat > /etc/nginx/sites-available/dls << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Frontend
    location / {
        root /var/www/dls-website/frontend/build;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/dls /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t > /dev/null 2>&1
systemctl reload nginx
print_success "Nginx настроен"

# 11. Настройка Firewall
echo "🔒 Настройка Firewall..."
ufw --force enable > /dev/null 2>&1
ufw allow 22 > /dev/null 2>&1
ufw allow 80 > /dev/null 2>&1
ufw allow 443 > /dev/null 2>&1
print_success "Firewall настроен"

# 12. Установка SSL
echo "🔐 Установка SSL сертификата..."
apt install -y certbot python3-certbot-nginx > /dev/null 2>&1
certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --no-eff-email --non-interactive --redirect > /dev/null 2>&1
systemctl enable certbot.timer > /dev/null 2>&1
print_success "SSL сертификат установлен"

# 13. Финальная проверка
echo ""
echo "======================================"
echo "✅ УСТАНОВКА ЗАВЕРШЕНА!"
echo "======================================"
echo ""
echo "🌐 Ваш сайт доступен по адресу:"
echo "   https://$DOMAIN"
echo ""
echo "📋 Статус сервисов:"
pm2 status
echo ""
echo "🔑 ВАЖНО: Добавьте Stripe ключи в:"
echo "   /var/www/dls-website/backend/.env"
echo ""
echo "Затем перезапустите backend:"
echo "   pm2 restart dls-backend"
echo ""
echo "📚 Полезные команды:"
echo "   pm2 logs dls-backend    - просмотр логов backend"
echo "   pm2 restart dls-backend - перезапуск backend"
echo "   systemctl status nginx  - статус Nginx"
echo "   systemctl status mongod - статус MongoDB"
echo ""
echo "======================================"
echo "🎉 Поздравляю! Сайт готов к работе!"
echo "======================================"
