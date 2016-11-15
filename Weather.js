/**
 * Created by emran on 11/15/16.
 */
const LocationFinder = require("./LocationFinder");
const LocationKeyFinder = require("./LocationKeyFinder");
const env = require("./env.json");
const request = require('sync-request');

const CACHE_EXPIRE_INTERVAL = 900000;

let locationFinder = new LocationFinder();
let locationKeyFinder = new LocationKeyFinder();

module.exports = function () {

    let cache = [];

    this.getWeather = function (city) {
        let location = locationFinder.find(city);
        if (!location)
            return undefined;

        let cacheKey = location.lat + "," + location.long;

        if (cache[cacheKey])
            if ((new Date().getTime() - cache[cacheKey].time) < CACHE_EXPIRE_INTERVAL)
                return cache[cacheKey].weather;

        let key = locationKeyFinder.find(location);

        let resp = request("GET", "http://dataservice.accuweather.com/currentconditions/v1/" + key + "?apikey=" + env.apiKey + "&language=fa");

        let weather = JSON.parse(resp.getBody().toString())[0];

        cache[cacheKey] = {
            time: new Date().getTime(),
            weather: weather
        };

        return weather;
    }

    this.getNiceWeather = function (city) {
        let w = this.getWeather(city);

        if (!w)
            return w;

        let wObserv = w.LocalObservationDateTime;

        return {
            time: wObserv.substr(wObserv.indexOf("T") + 1, wObserv.indexOf("+") - wObserv.indexOf("T") - 1),
            text: w.WeatherText,
            icon: w.WeatherIcon,
            temp: w.Temperature.Metric.Value,
            link: w.Link
        }
    }
};