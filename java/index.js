// Node.js system
import {token} from "./config.js";

const DCommando = require('discord.js-commando');
const config = require('./config.js');  //<< need to fix!

const bot = new DCommando.Client();

bot.registry.registerGroup('color', 'Color');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname+"/commands");

bot.login(console.log(token));