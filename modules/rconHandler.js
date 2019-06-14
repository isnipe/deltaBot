const Q3Rcon = require('quake3-rcon');
let settings = require('../settings');

let rcon;

function init() {

    rcon = new Q3Rcon({
        address: settings.rcon.ip,
        port: settings.rcon.port,
        password: settings.rcon.password
    });

}
function send(command, callback) {
    console.log("RCon: sent command '" + command + "'");
    rcon.send(command, callback);
}

module.exports = {init, send};