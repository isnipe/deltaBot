# deltaBot
Server administration bot for Call of Duty Modern Warfare 2.

## Getting started
To run this you will need the latest version of __Node.js__ available at https://nodejs.org/en/ .

## Settings
Before running deltaBot you should configure it for your server.
Open settings.json and edit the following variables to suit your needs:

__General settings__

`logfile` Relative or absolute path to your game log file. Usually a file called games_mp.log.

__RCon settings__

`ip` The ip address to your server

`port` The port at which the server is running

`password` The RCon password for your server


__Plugin settings__

A list of plugins to load, to add a plugin to deltaBot place it in the `/plugins` folder and add it to this list.

## Before running

Before deltaBot can run you will need to install its dependencies.
Open a terminal window and navigate to the deltaBot folder, now run `npm install` to install the dependencies.

## Running deltaBot

Run deltaBot by navigating to its directory in a terminal and running `node bot.js`.

deltaBot will now attempt to contact your server by RCon, if this succeeds it will start up.

## Writing plugins

To write a plugin please look at the /plugins/examplePlugin.js script.

**The plugin interface is subject to change**


 
