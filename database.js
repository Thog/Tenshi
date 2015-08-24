/**
 * Created by thog on 8/24/15.
 */


var mysql = require("mysql");
var connection = mysql.createConnection(require("./config/database"));
init  = function()
{
    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });
};

exports.init = init;