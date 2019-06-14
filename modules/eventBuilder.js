function getKillEvent(event) {
    let _victim = {
        guid: event.split(";")[1],
        clientnum: event.split(";")[2],
        team: event.split(";")[3],
        name: event.split(";")[4]
    };

    let _attacker = {
        guid: event.split(";")[5],
        clientnum: event.split(";")[6],
        team: event.split(";")[7],
        name: event.split(";")[8]
    };

    let _weapon = event.split(";")[9];

    return {
        attacker: _attacker,
        victim: _victim,
        weapon: _weapon
    };
}

module.exports = {getKillEvent};