# 📦 Как залить сайт на GitHub

## Вариант 1: Через Emergent (Рекомендуется) ⭐

Emergent имеет встроенную интеграцию с GitHub!

### Шаги:

1. **В интерфейсе Emergent:**
   - Найдите кнопку **"Save to Github"** в чате
   - Или используйте функцию автоматической синхронизации

2. **Подключите GitHub аккаунт:**
   - Emergent попросит авторизовать доступ к вашему GitHub
   - Разрешите доступ

3. **Выберите репозиторий:**
   - Создайте новый репозиторий или выберите существующий
   - Emergent автоматически загрузит все файлы

---

## Вариант 2: Вручную через Git

### Подготовка файлов

Сначала создайте `.gitignore` файл для исключения ненужных файлов:

```bash
cd /app
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
frontend/node_modules/
backend/__pycache__/
*.pyc
*.pyo
*.pyd
.Python

# Environment files
.env
backend/.env
frontend/.env.local
frontend/.env.development.local
frontend/.env.test.local
frontend/.env.production.local

# Logs
*.log
logs/
/var/log/

# Build files
frontend/build/
dist/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.pytest_cache/

# Emergent specific
.emergent/
EOF
```

### Шаг 1: Инициализация Git репозитория

```bash
cd /app

# Инициализация
git init

# Настройка пользователя (замените на свои данные)
git config user.name "Mikhail Shliachkov"
git config user.email "your-email@example.com"

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: DLS website with Stripe integration"
```

### Шаг 2: Создание репозитория на GitHub

1. Зайдите на [GitHub.com](https://github.com)
2. Нажмите кнопку **"New"** или **"+"** → **"New repository"**
3. Заполните форму:
   - **Repository name:** `dls-website` (или любое другое имя)
   - **Description:** `Digital Labeling System - Official Website`
   - **Public/Private:** выберите по желанию
   - **НЕ создавайте** README, .gitignore или license (у нас уже есть файлы)
4. Нажмите **"Create repository"**

### Шаг 3: Подключение к GitHub и загрузка

После создания репозитория GitHub покажет инструкции. Используйте эти команды:

```bash
cd /app

# Добавление удалённого репозитория (замените YOUR-USERNAME и REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Переименование ветки в main (если нужно)
git branch -M main

# Загрузка на GitHub
git push -u origin main
```

**Пример:**
```bash
git remote add origin https://github.com/mikhail-shliachkov/dls-website.git
git branch -M main
git push -u origin main
```

### Шаг 4: Аутентификация

GitHub может попросить авторизацию:

**Опция 1: Personal Access Token (Рекомендуется)**

1. Перейдите: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Нажмите **"Generate new token"** → **"Generate new token (classic)"**
3. Выберите срок действия и права:
   - ✅ `repo` (полный доступ к репозиториям)
4. Скопируйте созданный token
5. При запросе пароля введите этот token вместо пароля

**Опция 2: SSH ключ**

```bash
# Генерация SSH ключа
ssh-keygen -t ed25519 -C "your-email@example.com"

# Копирование публичного ключа
cat ~/.ssh/id_ed25519.pub

# Добавьте этот ключ на GitHub:
# Settings → SSH and GPG keys → New SSH key
```

Затем используйте SSH URL:
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

---

## Вариант 3: Использование GitHub Desktop

1. Скачайте [GitHub Desktop](https://desktop.github.com/)
2. Установите и войдите в аккаунт
3. **File → Add Local Repository**
4. Выберите папку `/app`
5. Нажмите **"Publish repository"**
6. Выберите название и видимость
7. Готово!

---

## 🔒 Безопасность - ВАЖНО!

### Перед загрузкой убедитесь:

1. **`.env` файлы НЕ загружаются** (проверьте `.gitignore`)
2. **Stripe ключи НЕ в коде** (они должны быть только в `.env`)
3. **Проверьте, что секретные данные скрыты:**

```bash
# Проверка, что .env не добавлен в git
git status

# Если .env появился в списке - удалите его из индекса:
git rm --cached backend/.env
git rm --cached frontend/.env
```

### Создание примера .env файла

Создайте `.env.example` для других разработчиков:

```bash
cat > backend/.env.example << 'EOF'
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
EOF
```

Добавьте в git:
```bash
git add backend/.env.example
git commit -m "Add environment example file"
git push
```

---

## 📋 Структура для GitHub

Создайте красивый README.md для репозитория:

```bash
cat > /app/README.md << 'EOF'
# 🚀 DLS - Digital Labeling System

Official website for Digital Labeling System - The Operating System for Physical Retail.

## 🎯 Features

- Modern responsive design with Tailwind CSS
- Stripe payment integration
- React 19 frontend
- FastAPI backend
- MongoDB database

## 🛠 Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Stripe.js
- Lucide React Icons

### Backend
- FastAPI
- Python 3.11
- Motor (MongoDB async driver)
- Stripe API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB
- Yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/dls-website.git
cd dls-website
\`\`\`

2. Setup Backend:
\`\`\`bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Stripe keys
\`\`\`

3. Setup Frontend:
\`\`\`bash
cd frontend
yarn install
\`\`\`

4. Run the application:
\`\`\`bash
# Terminal 1 - Backend
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Terminal 2 - Frontend
cd frontend
yarn start
\`\`\`

## 🔑 Environment Variables

Create \`.env\` files based on \`.env.example\`:

### Backend (.env)
\`\`\`
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
MONGO_URL=mongodb://localhost:27017
DB_NAME=dls_database
\`\`\`

## 📝 License

© 2025 Digital Labeling System. All rights reserved.

## 👤 Author

**Mikhail Shliachkov**
- LinkedIn: [mikhail-shliachkov](https://linkedin.com/in/mikhail-shliachkov-413921391)
- Website: [dls-ai.io](https://dls-ai.io)
EOF
```

---

## 🔄 Обновление кода на GitHub

После внесения изменений:

```bash
cd /app

# Проверка изменённых файлов
git status

# Добавление изменений
git add .

# Коммит с описанием
git commit -m "Update: описание изменений"

# Загрузка на GitHub
git push
```

---

## 📦 Полезные Git команды

```bash
# Проверка статуса
git status

# История коммитов
git log --oneline

# Отмена последнего коммита (без потери изменений)
git reset --soft HEAD~1

# Просмотр изменений
git diff

# Создание новой ветки
git checkout -b feature/new-feature

# Переключение на ветку
git checkout main

# Слияние веток
git merge feature/new-feature
```

---

## 🆘 Решение проблем

### "Permission denied"
- Используйте Personal Access Token вместо пароля
- Или настройте SSH ключ

### "Repository not found"
- Проверьте правильность URL
- Убедитесь, что репозиторий создан на GitHub

### ".env файлы загружаются"
```bash
git rm --cached backend/.env
echo "backend/.env" >> .gitignore
git add .gitignore
git commit -m "Fix: exclude .env from git"
git push
```

### "Large files"
GitHub ограничивает размер файлов до 100MB. Если есть большие файлы:
```bash
# Посмотреть большие файлы
find . -type f -size +50M

# Добавить в .gitignore
echo "path/to/large/file" >> .gitignore
```

---

## 🎓 Дополнительные ресурсы

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Emergent Platform Docs](https://docs.emergent.sh)

---

**Готово! Ваш сайт теперь на GitHub! 🎉**
