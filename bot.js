const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN is missing!');
  process.exit(1);
}

const bot = new Telegraf(token);
const app = express();

// استخدام البورت الذي يحدده Railway تلقائياً أو 3000 محلياً
const PORT = process.env.PORT || 3000;

// قراءة الملفات الثابتة (مثل index.html)
app.use(express.static(__dirname));

// مسار الويب الأساسي لعرض صفحة الميني أب
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// إعدادات بوت التيليجرام وأزرار الميني أب
bot.start((ctx) => {
  ctx.reply('أهلاً بك في منصة استثمار وتعدين عملة TON 💎\n\nاضغط على الزر أدناه لفتح لوحة التحكم والتعدين:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 فتح منصة الاستثمار',
            web_app: { url: 'https://ton-investment-bot-production.up.railway.app' }
          }
        ],
        [
          {
            text: '📢 قناة التحديثات',
            url: 'https://t.me/MoneyVault10'
          }
        ]
      ]
    }
  });
});

// تشغيل سيرفر الويب أولاً والاستماع على جميع واجهات الشبكة 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and listening on port ${PORT}`);
  
  // تشغيل البوت بعد نجاح إقلاع السيرفر
  bot.launch().then(() => {
    console.log('Telegram Bot started successfully!');
  }).catch((err) => {
    console.error('Failed to start Telegram bot:', err);
  });
});
