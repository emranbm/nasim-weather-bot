/**
 * Created by emran on 11/15/16.
 */

const request = require("sync-request");
const env = require("./env.json");

module.exports = function () {
    let cache = [];

    this.find = function (location) {
        let cacheKey = location.lat + "," + location.long;

        if (cache[cacheKey] != null)
            return cache[cacheKey];

        let resp = request("GET", "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=" + location.lat + "," + location.long
            + "&apikey=" + env.apiKey);

        let key = JSON.parse(resp.getBody().toString()).Key;

        cache[cacheKey] = key;

        return key;
    }
};