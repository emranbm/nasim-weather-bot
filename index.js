/**
 * Created by emran on 11/15/16.
 */

const env = require("./env.json")
const NasimPlatform = require('nasim-bot');
const Weather = require('./Weather');

let weather = new Weather();

let bot = new NasimPlatform.NasimBot(env.botToken);

bot.hears(["/start", "salam", "سلام", "hi "], (message, responder) => {
    responder.reply("سلام. من میتوانم اطلاعات آب و هوایی کشور را در اختیار شما بگذارم!" + "\n" + "کافی است نام شهر خود را وارد کنید");
});

bot.setDefaultCallback((message, responder) => {

    let w = weather.getNiceWeather(message.text);

    let msg;

    if (w) {
        msg = "دمای هوای ";
        msg += message.text + "\n";
        msg += w.temp + " درجه سانتیگراد" + "\n";
        msg += w.text + "\n\n";
        msg += "اندازه گیری شده در ساعت " + w.time;
    } else {
        msg = "شهر مورد نظر پیدا نشد." + "\n";
        if (message.text.charCodeAt(0) > 122)
            msg += "لطفا اسم شهر خود را به انگلیسی وارد کنید."
    }


    responder.reply(msg);
});