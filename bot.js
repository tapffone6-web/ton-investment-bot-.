const { Telegraf } = require('telegraf');

// استخدام التوكن من متغيرات البيئة التي أضفناها في Railway
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('أهلاً بك يا Make في منصة استثمار وتعدين عملة TON 💎\n\nمن خلال هذا البوت، يمكنك استثمار أموالك، متابعة أرباحك اليومية، وسحب أرباحك بكل سهولة.\n\nاختر أحد الخيارات أدناه للبدء:', {
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
            url: 'https://t.me/MoneyVault10' // يمكنك تغيير الرابط بقناتك هنا
          }
        ],
        [
          {
            text: '💰 رصيدي وأرباحي',
            callback_data: 'balance'
          }
        ]
      ]
    }
  });
});

// التعامل مع زر رصيدي وأرباحي (كمثال)
bot.action('balance', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('رصيدك الحالي هو: 0 TON');
});

bot.launch();
console.log('Bot is running...');
