/**
 * Created by thog on 8/24/15.
 */


exports.init = function (bot) {
    bot.addCommand("reload", function (bot, from, to, message) {
        if (from.indexOf("Thog") > -1) {
            bot.reload();
        }
    });
}