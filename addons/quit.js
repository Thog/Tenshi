exports.init = function (bot) {

    bot.addCommand("quit", function (bot, from, to, message) {
        if (from.indexOf("Thog") > -1) {
            bot.say(to, "Bye!");
            bot.disconnect("Bye!", function () {
                process.exit(0);
            });
        }
    });

}