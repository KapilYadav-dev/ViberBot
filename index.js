const { Telegraf } = require('telegraf')
const scrape=require('./scrape')
const bot = new Telegraf('1647124224:AAF8QXL_pQ8dhU6jZCnMR7o_j2T3romjlN4')
bot.start((ctx) => ctx.reply(`Welcome ${ctx.from.first_name} to Vibber. Here you can get direct youtube video download link...\nJust tell me the link of that video😉`))
bot.on('text', (ctx) => {
    var url=ctx.message.text
    var regex =['youtube','yout']
    if(regex.some((v) => url.toLowerCase().includes(v))){
        scrape.doWork(ctx,url)
        ctx.reply('I am searching for link.\nPlease wait😄')
    }
    else ctx.reply('Please feed me with a valid URL😓')
  })
bot.launch()    