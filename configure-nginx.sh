#!/bin/bash

# Переменные
FRONTEND_DIR="/var/www/diploma/frontend"
NGINX_CONF_DIR="/etc/nginx/sites-available"
NGINX_CONF_FILE="diploma.conf"
DOMAIN="141.144.204.36" # Замените на ваш домен
BACKEND_PORT="5000" # Порт, на котором работает бэкенд

# Остановить скрипт при ошибке
set -e

# Настройка Nginx
echo "Configuring Nginx..."
sudo bash -c "cat > $NGINX_CONF_DIR/$NGINX_CONF_FILE <<'EOF'
server {
    listen 80;
    server_name $DOMAIN;

    root $FRONTEND_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:$BACKEND_PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/diploma/frontend/html;
    }
}
EOF"

# Активируем конфигурацию Nginx
sudo ln -sf $NGINX_CONF_DIR/$NGINX_CONF_FILE /etc/nginx/sites-enabled/
sudo nginx -t # Проверяем конфигурацию Nginx
sudo systemctl restart nginx # Перезапускаем Nginx

echo "Configuring Nginx completed successfully!"