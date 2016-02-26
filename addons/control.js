/**
 * Created by Thog9 on 27/02/2016.
 */

exports.init = function (bot) {
    bot.addCommand("join", function (bot, from, to, message) {
        bot.join(message.split(" ")[1]);
    });

    bot.addCommand("part", function (bot, from, to, message) {
        bot.part(message.split(" ")[1]);
    })
}