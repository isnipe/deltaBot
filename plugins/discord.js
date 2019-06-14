/*Example plugin for deltaBot that integrates the discord api
* to print out data to a certain discord channel*/

let settings = require("../settings");

let prefix = "!";
let boundchannel;
let printkills = false;
let pluginTools;


const discordapi = require('discord.js');
const client = new discordapi.Client();

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

}

function onPlayerKilled(attacker, victim, weapon) {
    if (boundchannel && printkills) {
        boundchannel.send("```cs\n'" + attacker.name + "' killed '" + victim.name + "' with '" + weapon + "'```");
    }
}

function onPlayerSuicide(victim, weapon) {

}

function onPlayerJoined(player) {
    setOnlinePlayersInActivity();

    if (boundchannel) {
        boundchannel.send("```cs\n'" + player.name + "' has joined the server" + "```");
    }
}

function onPlayerLeft(player) {
    setOnlinePlayersInActivity();

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
}


/////OTHER FUNCTIONS////

function bindToChannel() {
    boundchannel = client.channels.get(settings.discord.channel_id);
}

function handleDiscordCommand(message) {

    if (message.content.startsWith(prefix + "help")) {
        message.channel.send("I can't do that yet :(");
    } else if (message.content.startsWith(prefix + "bind")) {
        boundchannel = message.channel;
        message.channel.send("I will now log server actions in this channel");

    } else if (message.content.startsWith(prefix + "prefix")) {

        var newPrefix = message.content.split(' ')[0];
        message.channel.send("I will now listen to commands with the " + newPrefix + " prefix");
        prefix = newPrefix;

    } else if (message.content.startsWith(prefix + "map")) {
        //TODO: RCON-> changeMap(message);
    } else if (message.content.startsWith(prefix + "status")) {
        pluginTools.rcon.send("status", response => {
            boundchannel.send(response.split("print\n")[1]);
        });
        //TODO: RCON-> status(message);
    } else if (message.content.startsWith(prefix + "printkills")) {
        if (printkills) {
            printkills = false;
            message.channel.send("I will no longer print kills");
        } else {
            printkills = true;
            message.channel.send("I will print kills from now on");
        }
    }
}

function handleDiscordMessage(message) {
    if (message.channel.id === boundchannel.id) pluginTools.rcon.send('sayraw ^5[Discord] ^7' + message.author.username + ": " + message.content, response => {
        console.log(response);
        message.react("✅");
    });
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
        setOnlinePlayersInActivity();
    })
}

function setOnlinePlayersInActivity() {
    client.user.setActivity(pluginTools.getOnlinePlayers().length === 1 ? "1 player" : pluginTools.getOnlinePlayers().length + " players", {type: "WATCHING"})
}

module.exports = {
    manifest,
    init,
    pause,
    resume,
    onPlayerKilled,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerSay,
    onPlayerSuicide
};