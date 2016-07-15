/**
 * Created by Thog on 15/07/2016.
 */
var util = require('util');

function float2int (value) {
    return value | 0;
}

function formatDuration(timeInMilliseconds) {
    var seconds = float2int(timeInMilliseconds / 1000);
    var minutes = float2int(seconds / 60);
    console.log(minutes)
    seconds = seconds - (minutes * 60);
    var hours = float2int(minutes / 60);
    minutes = minutes - (hours * 60);
    var result = "";
    if (hours > 0)
        result += util.format("%d hours ", hours);
    if (minutes > 0 || hours > 0)
        result += util.format("%d minutes ", minutes);
    result += util.format("%d seconds", seconds);
    return result;
}

exports.init = function (bot) {
    bot.addCommand("uptime", function (bot, from, to, message) {
        bot.say(to == bot.nick ? from : to, util.format("Uptime: %s", formatDuration(Date.now() - bot.startTime)));
    })
}