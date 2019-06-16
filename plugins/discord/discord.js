/*Example plugin for deltaBot that integrates the discord api
* to print out data to a certain discord channel*/
const discordapi = require('discord.js');

let prefix = "!";
let boundchannel;
let plugin;


function init(_plugin) {
    plugin = _plugin;
    client = new discordapi.Client();
    registerClientEvents();
    client.login(plugin.settings.token);
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
    client.login(plugin.settings.token);

}

function bindToChannel() {
    boundchannel = client.channels.get(plugin.settings.channel_id);
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
            message.channel.send(`I will now listen to commands with the ${prefix} prefix`);
            break;

        case "map":
            plugin.tools.rcon.send("map " + command[1], response => {
                if (response.startsWith("print\nUnloaded fastfile")) {
                    message.channel.send(`Map changed to \`${command[1]}\``);
                } else {
                    message.channel.send("Something went wrong while attempting to change maps.");
                }
            });
            break;

        case "status":
            plugin.tools.rcon.send("status", response => {
                message.channel.send(response.split("print\n")[1]);
            });
            break;

        default:
            break;
    }
}


function handleDiscordMessage(message) {
    console.log("[DISCORD CHAT] " + message.author.username + ": " + message.content);
    /*  TODO: use RCon command 'sayraw' to broadcast discord message to game?
    *   IW4x RCon protocol is bugged. (confirmed by IW4x staff member)
    *   Sometimes RCon commands gets executed twice,
    *   thus making is impossible to add this feature for the time being*/
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