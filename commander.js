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

load = function(bot, addonsDir)
{
    console.log("Loading commands...");
    walk(addonsDir , function(filePath, name)
    {
        var mod = require("./" + filePath);
        bot.addListener('message', function (from, to, message) {
            if (message.indexOf("!" + name.replace(".js", "")) > -1)
            {
                mod.manage(bot, from, to, message)
            }
        });
    });
};

reload = function(bot, addonDir)
{
    console.log("Unloading commands...");
    walk(addonDir, function(filePath, name)
    {
        console.log("Unloading " + name);
        delete require.cache[require.resolve("./" + filePath)];
    });
    bot.removeAllListeners('message');
    load(bot, addonDir);
    console.log("Reload complete");
}

exports.load = load;
exports.reload = reload;