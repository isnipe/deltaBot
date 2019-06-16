let mysql = require("mysql");
let connection;

//TODO: finish up this plugin. It is not ready yet.

function init(plugin) {
    connection = mysql.createConnection({
        host: plugin.settings.host,
        user: plugin.settings.user,
        password: plugin.settings.password,
        database: plugin.settings.database
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
    init,
    pause,
    resume,
    onPlayerKilled,
    onPlayerJoined,
    onPlayerSay,
};