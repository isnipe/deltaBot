let players = [];
let rcon;

function getOnlinePlayers(){
    return players;
}

function setOnlinePlayers(playersArray){
    players = playersArray;
}
module.exports = {getOnlinePlayers, setOnlinePlayers, rcon};

