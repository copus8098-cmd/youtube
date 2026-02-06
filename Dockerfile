FROM node:20

# تثبيت الأدوات الضرورية لنظام Linux
RUN apt-get update && apt-get install -y \
    python3 \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# تثبيت yt-dlp في النظام
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# نسخ ملفات التعريف فقط
COPY package.json ./

# حذف أي ملف lock قديم قد يأتي مع النسخ وتثبيت جديد كلياً
RUN rm -f package-lock.json && npm install

# نسخ باقي الملفات
COPY . .

# بناء مشروع Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]