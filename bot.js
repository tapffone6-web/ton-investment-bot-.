const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

// السماح بقراءة ملفات الويب
app.use(express.static(__dirname));

// تشغيل صفحة الويب عندما يدخل المستخدم على الرابط العام
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// رسالة البدء في البوت وأزرار الميني أب
bot.start((ctx) => {
  ctx.reply('أهلاً بك يا Make في منصة استثمار وتعدين عملة TON 💎\n\nمن خلال هذا البوت، يمكنك استثمار أموالك، متابعة أرباحك اليومية، وسحب أرباحك بكل سهولة.', {
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
            text: '📢 قناة التحديثات والفعاليات',
            url: 'https://t.me/MoneyVault10'
          }
        ]
      ]
    }
  });
});

bot.launch();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
