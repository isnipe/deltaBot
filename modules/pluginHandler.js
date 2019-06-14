let settings = require("../settings");
let plugins = [];
let pluginTools = require('./pluginTools');

//TODO read manifest of plugin and log when a plugin is loaded, stopped, ...
function init() {
    for (let plugin of settings.plugins) {
        loadPlugin("../plugins/" + plugin);
    }
}

function loadPlugin(script) {
    let plugin = require(script);
    if (plugin.init(pluginTools)) plugins.push(plugin);
}

function notifyKill(event) {
    for (let plugin of plugins) {
       if(functionExists(plugin.onPlayerKilled)) plugin.onPlayerKilled(event.attacker, event.victim, event.weapon);
    }
}

function notifyJoin(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onPlayerJoined)) plugin.onPlayerJoined(event.player);
    }
}

function notifyQuit(event) {
    for (let plugin of plugins) {
       if(functionExists(plugin.onPlayerLeft)) plugin.onPlayerLeft(event.player);
    }
}

function notifySay(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onPlayerSay)) plugin.onPlayerSay(event.player, event.message);
    }
}

//TODO: hook this up
function notifyMapChange(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onMapChange)) plugin.onMapChange(event);//var oldmap, var newmap
    }
}

function functionExists(func) {
    return (typeof func === "function");
}

module.exports = {init, loadPlugin, notifyKill, notifyJoin, notifyQuit, notifySay, pluginTools};