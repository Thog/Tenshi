/**
 * Created by thog on 8/24/15.
 */


exports.manage = function(bot, from, to, message)
{
    var commander = require("../commander");
    commander.reload(bot, "addons");
}