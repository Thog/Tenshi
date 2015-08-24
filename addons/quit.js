/**
 * Created by thog on 8/24/15.
 */

exports.manage = function(bot, from, to, message)
{
    if (from.indexOf("Thog") > -1)
    {
        bot.say(to, "Bye!");
        bot.disconnect();
    }
}