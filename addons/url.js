/**
 * Created by Thog9 on 26/02/2016.
 */
exports.init = function (bot) {
    var URL_REGEX = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
    var request = require("request");
    var cheerio = require("cheerio");
    var util = require('util');
    var urlModule = require('url');

    console.log("Loading URL module...");
    bot.addListener('message', function (from, to, message) {
        var url = URL_REGEX.exec(message);
        if (url != null) {
            request({url: url[0]}, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    if ($("title").text() != null) {
                        bot.say(to == bot.nick ? from : to, util.format("[ %s ] - %s", $("title").text(), urlModule.parse(url[0]).hostname));
                    }
                }
            });
        }
    });
}