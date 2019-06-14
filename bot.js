const pluginHandler = require("./modules/pluginHandler");
const eventParser = require("./modules/eventParser");
const logParser = require("./modules/logParser"); // ''; //absolute path to logfile
const settings = require("./settings");
const rconHandler = require("./modules/rconHandler");

function init() {
    //Check if the server is running and accessible by RCon before doing anything else
    rconHandler.init();
    rconHandler.send("status", response => checkRconConnection(response));
}

function checkRconConnection(response) {
    if (response.startsWith("print")) {
        console.log("RCon connection successfull")

        pluginHandler.pluginTools.rcon = rconHandler;
        finishStartup();
    } else {
        throw "RCon connection failed. Please check your settings and try again";
    }
}

function finishStartup() {
    pluginHandler.init();
    logParser.init(settings.general.logfile, eventParser.handleEvent);
    eventParser.init(pluginHandler);
}

init();