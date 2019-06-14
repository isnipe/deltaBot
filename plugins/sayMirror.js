/*Example plugin for deltaBot*/

let rcon;

const manifest = {
    author: "jordi",
    name: "sayMirror",
    version: 1.0,
    description: "Example plugin: mirrors whatever a player has said back into the chat"
};

function init(toolKit) {
    rcon = toolKit.rcon;
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

function onPlayerSay(player, message){
    rcon.send(`say ${message}`);
}

module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerSay
};