require("log-timestamp");

const version = 0.1;
const pluginHandler = require("./modules/pluginHandler");
const eventParser = require("./modules/eventParser");
const logParser = require("./modules/logParser"); // ''; //absolute path to logfile
const rconHandler = require("./modules/rconHandler");
const settings = require("./settings");

function init() {
    console.log("deltaBot v" + version);

    switch (process.argv[2]) {

        case "--fix-dependencies":
            console.log("deltaBot will now install all dependencies");
            //TODO: lookup dependencies from plugins and add them to package.json
            break;

        case "--run":
            //Check if the server is running and accessible by RCon before doing anything else
            console.log("Testing RCon connection");
            rconHandler.send("status", response => checkRconConnection(response));
            break;

        default:
            console.log("deltaBot can not be run this way");
    }


}

function checkRconConnection(response) {
    if (response.startsWith("print")) {
        console.log("RCon connection successfully established")

        rconHandler.close();
        pluginHandler.pluginTools.rcon = rconHandler;
        finishStartup();
    } else {
        console.log(response)
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