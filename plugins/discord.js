/*Example plugin for deltaBot that integrates the discord api
* to print out data to a certain discord channel*/

let settings = require("../settings");

let prefix = "!";
let boundchannel;
let pluginTools;


const discordapi = require('discord.js');
let client = new discordapi.Client();

const manifest = {
    author: "jordi",
    version: 1.0,
    description: "Discord plugin for deltaBot"
};

function init(toolKit) {
    pluginTools = toolKit;
    registerClientEvents();
    client.login(settings.discord.token);
    return true;
}

function pause() {
    client.destroy();
}

function onPlayerJoined(player) {
    if (boundchannel) {
        boundchannel.send("```cs\n'" + player.name + "' has joined the server" + "```");
    }
}

function onPlayerLeft(player) {
    if (boundchannel) {
        boundchannel.send("```cs\n'" + player.name + "' has left the server```");
    }
}

function onPlayerSay(player, message) {
    if (boundchannel) {
        boundchannel.send("**" + player.name + "**: " + message);
    }
}

function resume() {
    client = new discordapi.Client();
    client.login(settings.discord.token);

}

function bindToChannel() {
    boundchannel = client.channels.get(settings.discord.channel_id);
}

function handleDiscordCommand(message) {

    let command = message.content.substring(1).split(" ");
    switch (command[0]) {

        case "help":
            //TODO: respond with supported commands
            message.channel.send("I can't do that yet");
            break;

        case "prefix":
            prefix = command[1];
            message.channel.send(`I will now listen to command with the ${prefix} prefix`);
            break;

        case "map":
            pluginTools.rcon.send("map " + command[1]);
            message.channel.send(`Map changed to \`${command[1]}\``);
            break;

        case "status":
            pluginTools.rcon.send("status", reponse => {
                message.channel.send(reponse.split("print\n")[1]);
            });
            break;

        default:
            break;
    }
}


function handleDiscordMessage(message) {
    console.log("[DISCORD] " + message.author.username + ": " + message.content);
    //TODO: use RCon command 'sayraw' to broadcast discord message to game?
}

function registerClientEvents() {
    client.on('message', message => {
        if (message.author.bot) return;

        if (message.content.startsWith(prefix)) {
            handleDiscordCommand(message);
        } else {
            handleDiscordMessage(message);
        }

    });

    client.on('ready', () => {
        bindToChannel();
    })
}

module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerSay,
};