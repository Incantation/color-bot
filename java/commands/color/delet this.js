const commando = require('discord.js-commando');

class delet_this extends commando.Command {
    constructor(client){
        super(client, {
            name: 'delet',
            group: 'color',
            memberName: 'delet',
            description: 'DELET THIS'
        });
    }
    async run(message){
        for(var i=0; i<message.length; i++){
            if(97 < message.charCodeAt(i) && 122 > message.charCodeAt(i)){ //checks every character to see if at least one character is lower case.
                message.delete();                                          //if so, then it's not in all caps and MUST BE DELETED
                message.reply("YOU JUST GOT CAUGHT LACKING! NO LOWERCASE IN THIS CHANNEL!")
                break;
            }
        }
    }
}

module.exports = delet_this;