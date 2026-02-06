FROM node:20

# 1. تثبيت python3 والأدوات اللازمة
# أضفنا python-is-python3 لضمان أن أمر "python" يعمل
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    curl \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 2. تثبيت yt-dlp العالمي
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# 3. نسخ ملف الإعدادات
COPY package.json ./

# 4. التثبيت الآن سينجح لأن المكتبة ستجد أمر "python"
RUN rm -f package-lock.json && npm install

# 5. نسخ باقي الملفات وبناء التطبيق
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]