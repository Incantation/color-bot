const commando = require('discord.js-commando');

class randomColor extends commando.Command {
    constructor(client){
        super(client, {
            name: 'rcolor',
            group: 'color',
            memberName: 'rcolor',
            description: 'Offers a random color.'
        });
    }
    async run(message){
        message.reply("here's a color for you! https://www.colorhexa.com/" + Math.floor(Math.random() * 16777215).toString(16));
    }
}

module.exports = randomColor;