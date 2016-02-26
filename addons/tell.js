exports.init = function (bot, database) {
    bot.addCommand("tell", function (bot, from, to, message) {
        console.log(message);
    });
}