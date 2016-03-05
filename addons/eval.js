/**
 * Created by Thog9 on 04/03/2016.
 */

exports.init = function (bot) {
    bot.addCommand("eval", function (bot, from, to, message) {
        if (from.indexOf("Thog") > -1) {
            var expr = message.substr(message.indexOf("eval") + 5);
            try {
                var result = 0;
                eval("result = " + expr);
                bot.say(to == bot.nick ? from : to, expr + " = " + result);
            } catch (err) {
                bot.say(to == bot.nick ? from : to, "Error during execution!")
            }
        }
    });
}