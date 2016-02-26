/**
 * Created by thog on 8/24/15.
 */


function walk(currentDirPath, callback) {
    var fs = require('fs'), path = require('path');
    var files = fs.readdirSync(currentDirPath);
    files.forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, name);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });
}

load = function(bot, database, addonsDir)
{
    console.log("Loading modules...");
    walk(addonsDir , function(filePath, name)
    {
        console.log("Loading " + name);
        var mod = require("./" + filePath);
        mod.init(bot, database);
    });
};

reload = function(bot, database, addonDir)
{
    try
    {
        console.log("Unloading modules...");
        walk(addonDir, function(filePath, name)
        {
            console.log("Unloading " + name);
            delete require.cache[require.resolve("./" + filePath)];
        });
        bot.removeAllListeners('message');
        load(bot, database, addonDir);
        console.log("Reload complete");
    } catch (err)
    {
        for (var channel in bot.chans)
            bot.say(channel, "Error: " + err.message);
        console.error(err.stack);
    }
}

exports.load = load;
exports.reload = reload;