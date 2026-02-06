# استخدام نسخة Node كاملة لتجنب نقص المكتبات
FROM node:20

# تثبيت الأدوات الأساسية
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# تثبيت yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# نسخ ملفات الحزم أولاً
COPY package*.json ./

# تنفيذ التثبيت مع تجاهل التعارضات البسيطة وتنظيف الكاش
RUN npm install --legacy-peer-deps

# نسخ باقي ملفات المشروع
COPY . .

# بناء المشروع
RUN npm run build

EXPOSE 3000

# تشغيل السيرفر
CMD ["npm", "start"]