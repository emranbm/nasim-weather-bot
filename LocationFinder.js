/**
 * Created by emran on 11/15/16.
 */

const fs = require('fs');

module.exports = function () {
    let str = fs.readFileSync(__dirname + "/locations.txt").toString();

    let arr = str.split("\n");

    let locations = [];

    for (let a of arr) {
        let tmp = a.split(",");
        locations[tmp[0].toLowerCase()] = {
            lat: tmp[1],
            long: tmp[2]
        };
    }

    this.find = function (city) {
        // city = farsiToEng(city.toLowerCase());

        if (locations[city])
            return locations[city];
    };

    function farsiToEng(city) {
        if (city === "تهران")
            return "tehran";
        else if (city === "تبریز")
            return "tabriz";
        else if (city === "کرج")
            return "karaj";
        else if (city === "اصفهان")
            return "esfahan";
        else if (city === "شیراز")
            return "shiraz";
        else if (city === "اردبیل")
            return "ardabil";
        else if (city === "قم")
            return "qom";
        else if (city === "یزد")
            return "yazd";
        else if (city === "مشهد")
            return "mashhad";
        else if (city === "کرمان")
            return "kerman";
        else if (city === "نیشابور")
            return "neyshabur";
        else if (city === "زنجان")
            return "zanjan";
        else if (city === "ساری")
            return "sari";
        else
            return city;
    }
};
