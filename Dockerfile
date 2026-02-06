# استخدام نسخة Node.js مستقرة
FROM node:20-slim

# تثبيت Python و curl و ffmpeg (مهم جداً للتعامل مع الفيديوهات)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# تحميل تثبيت yt-dlp مباشرة في نظام التشغيل
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# إعداد مجلد العمل
WORKDIR /app

# نسخ ملفات الإعدادات وتثبيت المكتبات
COPY package*.json ./
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء مشروع Next.js
RUN npm run build

# تشغيل السيرفر
EXPOSE 3000
CMD ["npm", "start"]