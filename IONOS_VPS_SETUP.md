# 🚀 Установка DLS сайта на IONOS VPS - Полная Инструкция

## Шаг 1: Покупка VPS в IONOS

1. Зайдите на [ionos.com](https://www.ionos.com) или [ionos.ru](https://www.ionos.ru)
2. Найдите **"VPS"** или **"Cloud Server"**
3. Выберите **VPS S** (самый дешёвый, €2-4/мес):
   - 1 vCore
   - 1 GB RAM
   - 10 GB SSD
4. Операционная система: **Ubuntu 22.04 LTS** (ВАЖНО!)
5. При оформлении выберите **Root пароль** (запишите его!)
6. Оплатите

### После покупки получите:

В письме от IONOS или в панели:
- **IP адрес** (например: 185.123.45.67)
- **Root пароль**
- **SSH порт** (обычно 22)

---

## Шаг 2: Подключение к VPS

### На Windows:

1. Скачайте [PuTTY](https://www.putty.org/) или используйте Windows Terminal
2. В PuTTY введите:
   - Host: ваш IP адрес
   - Port: 22
   - Connection type: SSH
3. Нажмите **Open**
4. Login: `root`
5. Password: ваш root пароль

### На Mac/Linux:

Откройте терминал и выполните:
```bash
ssh root@ваш-ip-адрес
```
Введите пароль когда попросит.

---

## Шаг 3: Автоматическая установка (1 команда!) 🎯

После подключения по SSH, выполните ЭТУ команду:

```bash
curl -o- https://raw.githubusercontent.com/ваш-username/dls-website/main/install_ionos.sh | bash
```

**ИЛИ** если скрипт не на GitHub, используйте мой готовый скрипт ниже ⬇️

---

## Шаг 4: Ручная установка (если нужно)

### 4.1 Обновление системы

```bash
apt update && apt upgrade -y
```

### 4.2 Установка Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g yarn pm2
```

### 4.3 Установка Python

```bash
apt install -y python3 python3-pip python3-venv
```

### 4.4 Установка MongoDB

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

### 4.5 Установка Nginx

```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### 4.6 Клонирование кода

```bash
cd /var/www
git clone https://github.com/ваш-username/dls-website.git
cd dls-website
```

### 4.7 Настройка Backend

```bash
cd /var/www/dls-website/backend

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Создание .env файла
cat > .env << 'EOF'
MONGO_URL="mongodb://localhost:27017"
DB_NAME="dls_database"
CORS_ORIGINS="*"
STRIPE_SECRET_KEY="sk_test_51SYww12Repoud9h4GZNmeDB8ErZMrOtGDSX2SGHIYcSnGMaMSy1ukMetDPBM5gp5a9JlbMvMWdWmbYRmaTOrUbbI00sP3uxBpb"
STRIPE_PUBLISHABLE_KEY="pk_test_51SYww12Repoud9h4p0qR1xSIrL2eY98K4WXggSPCE1vWPv2mnFtx0coiEcvdSbvXWrQh5a1rWVvn4rUm8ZKYa9xE0004DNIOf9"
EOF

# Запуск backend через PM2
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name dls-backend
pm2 save
pm2 startup
```

### 4.8 Настройка Frontend

```bash
cd /var/www/dls-website/frontend

# Создание .env файла
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://ваш-домен.com
EOF

# Установка зависимостей и сборка
yarn install
yarn build
```

---

## Шаг 5: Настройка Nginx для домена

### 5.1 Создание конфигурации

```bash
nano /etc/nginx/sites-available/dls
```

Вставьте (замените **ваш-домен.com** на ваш реальный домен):

```nginx
server {
    listen 80;
    server_name ваш-домен.com www.ваш-домен.com;

    # Frontend
    location / {
        root /var/www/dls-website/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Сохраните (Ctrl+X, Y, Enter)

### 5.2 Активация конфигурации

```bash
ln -s /etc/nginx/sites-available/dls /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Шаг 6: Настройка домена в IONOS

1. Зайдите в панель IONOS → **Domains**
2. Выберите ваш домен (например: dls-ai.io)
3. **DNS Settings** или **Управление DNS**
4. Добавьте/измените записи:

```
Тип    | Имя  | Значение           | TTL
-------|------|--------------------|---------
A      | @    | ваш-ip-vps         | 3600
A      | www  | ваш-ip-vps         | 3600
```

**Сохраните!** Изменения вступят в силу через 5-30 минут.

---

## Шаг 7: Установка SSL (HTTPS) 🔒

```bash
# Установка Certbot
apt install -y certbot python3-certbot-nginx

# Получение SSL сертификата (замените email и домен!)
certbot --nginx -d ваш-домен.com -d www.ваш-домен.com --email ваш-email@example.com --agree-tos --no-eff-email

# Автообновление сертификата
systemctl enable certbot.timer
```

**Готово!** Ваш сайт теперь на HTTPS! 🎉

---

## 🔧 Полезные команды для управления

### Проверка статуса сервисов

```bash
# Backend
pm2 status
pm2 logs dls-backend

# MongoDB
systemctl status mongod

# Nginx
systemctl status nginx
nginx -t
```

### Перезапуск сервисов

```bash
# Backend
pm2 restart dls-backend

# MongoDB
systemctl restart mongod

# Nginx
systemctl reload nginx
```

### Просмотр логов

```bash
# Backend
pm2 logs dls-backend

# Nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# MongoDB
tail -f /var/log/mongodb/mongod.log
```

### Обновление кода с GitHub

```bash
cd /var/www/dls-website
git pull origin main

# Пересборка frontend
cd frontend
yarn build

# Перезапуск backend
pm2 restart dls-backend

# Перезагрузка nginx
systemctl reload nginx
```

---

## 🆘 Решение проблем

### Сайт не открывается

1. Проверьте DNS (должно пройти 5-30 мин после настройки)
```bash
ping ваш-домен.com
```

2. Проверьте Nginx
```bash
nginx -t
systemctl status nginx
```

3. Проверьте firewall
```bash
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

### Backend не работает

```bash
pm2 logs dls-backend
cd /var/www/dls-website/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
# Смотрите ошибки
```

### MongoDB не работает

```bash
systemctl status mongod
journalctl -u mongod
```

---

## ✅ Финальная проверка

После всех настроек проверьте:

```bash
# 1. Backend API
curl http://localhost:8001/api/

# 2. Frontend файлы
ls -la /var/www/dls-website/frontend/build

# 3. Nginx конфигурация
nginx -t

# 4. Все сервисы запущены
pm2 status
systemctl status nginx
systemctl status mongod
```

---

## 🎉 Готово!

Ваш сайт должен работать на:
- **http://ваш-домен.com** (и https:// после SSL)

**Страницы:**
- Главная: https://ваш-домен.com
- API: https://ваш-домен.com/api/
- Stripe кнопки работают!

---

## 📞 Нужна помощь?

Если что-то не работает:
1. Проверьте логи (команды выше)
2. Убедитесь что DNS настроен правильно
3. Проверьте firewall
4. Напишите мне - я помогу!
