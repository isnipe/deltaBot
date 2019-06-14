const settings = require("../settings");
let mysql = require("mysql");
let connection;

//TODO: finish up this plugin. It is not ready yet.

const manifest = {
    author: "jordi",
    name: "database",
    version: 1.0,
    description: "Database plugin for deltaBot.\nThis plugin will write data to a mysql database"
};

function init() {
    connection = mysql.createConnection({
        host: settings.database.host,
        user: settings.database.user,
        password: settings.database.password,
        database: settings.database.database
    });

    connection.connect();

    let success;

    connection.query("SHOW TABLES LIKE 'deltabot", function (error, results, fields) {
        if (error) {
            //some error has occurred, stop here.
            connection.end();
            console.error("Failed to connect to database, plugin will end");
            success = false;
        } else {
            //TODO: check if table exists, if not, create it
        }
    });

    return success;
}

function pause() {
    connection.end();
}

function resume() {
    connection.connect();
}

function onPlayerKilled(attacker, victim, weapon) {
    //TODO: +1 kill for attacker, +1 death for victim (check if this is not a suicide)
}

function onPlayerJoined(player) {
    //TODO: add +1 visits to player, update lastvisit date in database
}

function onPlayerSay(player, message) {
   //TODO: log chat in database
}

module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerKilled,
    onPlayerJoined,
    onPlayerSay,
};