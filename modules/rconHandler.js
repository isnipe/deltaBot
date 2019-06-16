const settings = require("../settings");

let ip = settings.rcon.ip;
let port = settings.rcon.port;
let password = settings.rcon.password;
let dgram = require("dgram");
let client;

function send(command, callback) {
    client = dgram.createSocket("udp4");

    client.on("message", message => callback(message.toString("utf8").trim().substr(4)));
    client.on("err", err => console.log(err));
    client.on("close", function () {
        console.log("RCon connection closed")
    });

    let buffer = getBuffer(command);
    client.send(buffer, 0, buffer.length, port, ip);
}

function close() {
    client.close();
}

function getBuffer(command) {
    let buffer = new Buffer.alloc(11 + password.length + command.length);
    buffer.writeUInt32LE(0xFFFFFFFF, 0);
    buffer.write('rcon ', 4);
    buffer.write(password, 9, password.length);
    buffer.write(' ', 9 + password.length, 1);
    buffer.write(command, 10 + password.length, command.length);
    buffer.write('\n', 10 + password.length + command.length, 1);

    return buffer;
}

module.exports = {send, close};