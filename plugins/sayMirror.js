/*Example plugin for deltaBot*/

let rcon;

const manifest = {
    author: "jordi",
    version: 1.0,
    description: "mirrors whatever a player has said back into the chat"
};

function init() {
    rcon = require("../modules/rconHandler");
    rcon.init();
    return true;    //return true to indicate startup success
}

function pause() {
    //Your plugin has been paused and will no longer receive events
    console.log("Plugin paused!");
}

function resume() {
    //Your plugin will now be resumed
    connsole.log("Plugin resumed!");
}

function onPlayerKilled(attacker, victim, weapon) {
}

function onPlayerSuicide(victim, weapon) {
}

function onPlayerJoined(player) {
}

function onPlayerLeft(player) {
}


module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerKilled,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerSuicide
};