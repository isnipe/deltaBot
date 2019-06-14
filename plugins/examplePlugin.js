/*Example plugin for deltaBot*/

const manifest = {
    author: "jordi",
    version: 1.0,
    description: "example plugin for deltaBot"
};

function init() {
    console.log("Example plugin started");
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
    console.log(attacker.name + " has killed " + victim.name + " with " + weapon);
}

function onPlayerJoined(player) {
    console.log(player.name + " has joined the game");
}

function onPlayerLeft(player) {
    console.log(player.name + " has left the game");
}

function onPlayerSay(player, message) {
    console.log(player.name + ": " + message);
}

module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerKilled,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerSay,
};