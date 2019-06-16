const fs = require("fs");

let pluginTools = require("./pluginTools");
let plugins = [];

//TODO add ability to pause, resume and stop plugins
function init() {
    //get all directories in the ./plugins directory
    let directories = fs.readdirSync("./plugins/").filter(function (file) {
        return fs.statSync('./plugins/' + file).isDirectory();
    })

    for (let directory of directories) {
        let plugin = getPlugin(directory);
        if (plugin) {
            if (loadPlugin(plugin)) {
                plugins.push(plugin);
            } else {
                console.error(`pluginHandler: ${directory} will not be loaded. It is disabled or misconfigured`);
            }
        } else {
            console.error(`pluginHandler: Error while attempting to load plugin ${directory}`);
        }
    }
}

function getPlugin(directory) {

    if (fs.existsSync(`./plugins/${directory}/settings.json`)) {
        //plugin settings found, read it to determine which script to load
        let _settings = require(`../plugins/${directory}/settings.json`);

        if (fs.existsSync(`./plugins/${directory}/${_settings.manifest.main}`)) {
            //main script was found, load it

            //TODO: add dependency check and install
            return {
                settings: _settings,
                script: require(`../plugins/${directory}/${_settings.manifest.main}`),
                tools: pluginTools,
                running: false
            };

        } else {
            //main script not found, plugin can not be loaded
            console.error(`pluginHandler: main script for plugin ${directory} was not found`);
            return null;
        }

    } else {
        //settings not found, plugin can not be loaded
        console.error(`pluginHandler: settings.json for plugin ${directory} was not found`);
        return null;
    }

}

function loadPlugin(plugin) {

    if (plugin.settings.manifest.enabled) {
        if (plugin.script.init(plugin)) {
            plugins.push(plugin);
            console.log(`pluginHandler: ${plugin.settings.manifest.name} v${plugin.settings.manifest.version} succesfully started`);
            plugin.running = true;
            return true;
        }
    }

    return false;
}

function notifyKill(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onPlayerKilled)) plugin.onPlayerKilled(event.attacker, event.victim, event.weapon);
    }
}

function notifyJoin(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onPlayerJoined)) plugin.onPlayerJoined(event.player);
    }
}

function notifyQuit(event) {
    for (let plugin of plugins) {
        if (functionExists(plugin.onPlayerLeft)) plugin.onPlayerLeft(event.player);
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