const fs = require('fs');
let lastLog;
let file;



function init(logFile, callbackOnEvent) {
    file = logFile;

    //TODO: find another way to check for logfile changed. fs.watchFile is unreliable and slow
    fs.watchFile(logFile, (current, previous) => {
        //When this code gets executed the logfile has changed
        //Read the logfile and filter the new data

        fs.readFile(logFile, 'utf8', (error, data) => {

            if (error) {
                console.log(error);
            } else {
                //   console.log("attempting to get new data");
                var newData = getNewData(data);

                if (newData) {
                    processData(newData, callbackOnEvent);
                }
            }
        });
    });
}

function getNewData(data) {
    if (lastLog) {
        //We already have a previous version of the logfile in our memory, we can compare them for differences now

        if (lastLog.length > data.length) {
            console.log("new logfile?");
            //lastlog is bigger, new logfile perhaps? everything in data should be processed
            lastLog = data;
            return data;
        }

        //TODO: !!IMPORTANT!! This is probably not a great solution for big logfiles. Fixme asap
        lastLogCopy = lastLog;
        lastLog = data;
        return data.replace(lastLogCopy, "");

    } else {
        //No logfile in the memory yet (meaning we probably just booted up this bot so ignore all data for now)
        lastLog = data;
        return null;
    }
}

function processData(data, callback) {

    let lines = data.split('\n');
    lines.pop(); //pop it since the last one will be an empty line

    for (let line of lines) {

        var log = {
            timestamp: line.substr(0, 6).replace(" ", ""),
            message: line.substr(7).replace("\r", "")
        }

        callback(log);
    }
}

module.exports = {init};