const Q3RCon = require('quake3-rcon');
let settings = require('../settings');

let rcon;

function init() {

    rcon = new Q3RCon({
        address: settings.rcon.ip,
        port: settings.rcon.port,
        password: settings.rcon.password
    });

}
function send(command, callback) {
    console.log("RCon: sent command '" + command + "'");
    //TODO: figure out why rcon commands get send twice sometimes
    rcon.send(command, callback);
}

module.exports = {init, send};