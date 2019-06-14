require("log-timestamp");

const version = 0.1;
const pluginHandler = require("./modules/pluginHandler");
const eventParser = require("./modules/eventParser");
const logParser = require("./modules/logParser"); // ''; //absolute path to logfile
const rconHandler = require("./modules/rconHandler");
const settings = require("./settings");

function init() {
    console.log("deltaBot v" + version);
    //Check if the server is running and accessible by RCon before doing anything else
    console.log("Initializing rconHandler");
    rconHandler.init();
    rconHandler.send("status", response => checkRconConnection(response));
}

function checkRconConnection(response) {
    if (response.startsWith("print")) {
        console.log("RCon connection successfully established")

        pluginHandler.pluginTools.rcon = rconHandler;
        finishStartup();
    } else {
        throw "RCon connection failed. Please check your settings and try again";
    }
}

function finishStartup() {
    console.log("Initializing pluginHandler");
    pluginHandler.init();
    console.log(`Initializing logParser for log '${settings.general.logfile}'`);
    logParser.init(settings.general.logfile, eventParser.handleEvent);
    console.log("Initializing eventParser");
    eventParser.init(pluginHandler);
}

init();