require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error('Error: Please set BOT_TOKEN in environment variables or .env file');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// رابط الـ Mini App الخاص بك (يمكنك تعديله لاحقاً)
const MINI_APP_URL = 'https://your-mini-app-domain.com';
const CHANNEL_URL = 'https://t.me/MoneyVault10';

bot.start((ctx) => {
    const userName = ctx.from.first_name || 'صديقي';
    
    ctx.reply(
        `أهلاً بك يا *${userName}* في منصة استثمار وتعدين عملة TON 💎\n\n` +
        `من خلال هذا البوت، يمكنك استثمار أموالك، متابعة أرباحك اليومية، وسحب أرباحك بكل سهولة.\n\n` +
        `اختر أحد الخيارات أدناه للبدء:`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🚀 فتح منصة الاستثمار', MINI_APP_URL)],
                [Markup.button.url('📢 قناة التحديثات والفعاليات', CHANNEL_URL)],
                [Markup.button.callback('💰 رصيدي وأرباحي', 'balance_info')]
            ])
        }
    );
});

bot.action('balance_info', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('📊 رصيدك الحالي:\n- رصيد التعدين: 0.00 TON\n- الأرباح المتاحة للسحب: 0.00 TON');
});

bot.launch()
    .then(() => {
        console.log('🤖 Bot is up and running successfully!');
    })
    .catch((err) => {
        console.error('Error starting bot:', err);
    });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
