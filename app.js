var irc = require('irc');
var bot = new irc.Client('irc.esper.net', 'Tenshi', {
    channels: ['#vader'],
    userName: "Kanade",
    realName: "Kanade Tachibana",
    debug: false,
    port: 6666
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

bot.addListener('pm', function(nick, message) {
    console.log('Got private message from %s: %s', nick, message);
});
bot.addListener('join', function(channel, who) {
    console.log('%s has joined %s', who, channel);
});
bot.addListener('part', function(channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
});
bot.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});

var commander = require('./commander');
var database = require("./database");
database.init();
commander.load(bot, "addons");