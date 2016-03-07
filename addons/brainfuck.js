/**
 * Created by Thog9 on 05/03/2016.
 */
function brainfuck(code, stack_size, cb) {
    var stack = new Array(stack_size).fill(0);
    var pos = 0;
    var loop_count = 0;
    var out = "";
    for (var i = 0; i < code.length; i++) {
        switch (code[i]) {
            case '>':
                pos++;
                break;
            case '<':
                pos--;
                break;
            case '+':
                stack[pos]++;
                break;
            case '-':
                stack[pos]--;
                break;
            case '.':
                out += String.fromCharCode(stack[pos]);
                break;
            case '[':
            {
                if (stack[pos] == 0) {
                    loop_count = 0;
                    i++;
                    while (i < code.length) {
                        if (code[i] == '[')
                            loop_count++;
                        else if (code[i] == ']' && loop_count == 0)
                            break;
                        else if (code[i] == ']')
                            loop_count--;
                        i++;
                    }
                }
                break;
            }
            case ']':
            {
                if (stack[pos] != 0) {
                    loop_count = 0;
                    i--;
                    while (i > 0) {
                        if (code[i] == ']')
                            loop_count++;
                        else if (code[i] == '[' && loop_count == 0)
                            break;
                        else if (code[i] == '[')
                            loop_count--;
                        i--;
                    }
                }
                break;
            }
            default:
                break;
        }
    }
    cb(out);
}

exports.init = function (bot) {
    bot.addCommand("bt", function (bot, from, to, message) {
        var expr = message.substr(message.indexOf("bt") + 3);
        brainfuck(expr, 4096, function(out)
        {
            bot.say(to == bot.nick ? from : to, out);
        })
    });
}