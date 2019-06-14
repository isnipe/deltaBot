let playersIngame = [];
let pluginHandler;
const eventBuilder = require("./eventBuilder");

function init(_pluginHandler) {
    pluginHandler = _pluginHandler;
}

//TODO: move event parsing and building to eventbuilder

function handleEvent(event) {

    switch (event.message.charAt(0)) {
        case "K":
            pluginHandler.notifyKill(eventBuilder.getKillEvent(event.message));
            break;
        case "J":
            handleJoin(event.message);
            break;
        case "Q":
            handleQuit(event.message);
            break;
        case "s":
            handleSay(event.message);
            break;
        default:
            handleOther(event.message);
    }
}


function handleOther(event) {
    console.log("FIXME: " + event);

    if (event === "InitGame") {
        handleInitGame();
    } else if (event === "ShutdownGame:") {
        //handleEndOfRound()
    }

}

function handleInitGame() {
    //this could mean a new round has started OR the server has changed maps
    console.log("FIXME: eventParser::handleInitGame: handle new round or map change");
}

function handleJoin(event) {
    let _player = {
        guid: event.split(";")[1],
        clientnum: event.split(";")[2],
        name: event.split(";")[3],
    }

    if (playersIngame.indexOf(_player.guid) > -1) {
        //player is already in our game, a new round has started it seems'
    } else {
        playersIngame.push(_player.guid);
        pluginHandler.pluginTools.setOnlinePlayers(playersIngame);

        let joinEvent = {
            player: _player
        }

        pluginHandler.notifyJoin(joinEvent)
    }
}

function handleQuit(event) {
    let _player = {
        guid: event.split(";")[1],
        clientnum: event.split(";")[2],
        name: event.split(";")[3],
    }

    if (playersIngame.indexOf(_player.guid) > -1) {
        //player was in our game and has left now
        playersIngame = playersIngame.filter(element => element !== _player.guid); //delete the player from the array
        pluginHandler.pluginTools.setOnlinePlayers(playersIngame);
        let quitEvent = {
            player: _player
        }

        pluginHandler.notifyQuit(quitEvent);
    }


}

function handleSay(event) {
    let sayEvent = {
        message: event.split(";")[4].substring(1),
        player: {
            guid: event.split(";")[1],
            clientnum: event.split(";")[2],
            name: event.split(";")[3]
        }
    }

    pluginHandler.notifySay(sayEvent);
}

module.exports = {init, handleEvent}