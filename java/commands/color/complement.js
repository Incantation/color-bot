const commando = require('discord.js-commando');
const Convert = require('./convertlib.js');

class complementaryColor extends commando.Command {
    constructor(client){
        super(client, {
            name: 'complement',
            group: 'color',
            memberName: 'ccolor',
            description: 'Offers the complementary color to the color you suggest in HEX.',
            examples: ['complement #7e5d5c', 'complement #66e924', 'complement rcolor'],
            args: [{
                key: 'text',
                prompt: 'give me a color in hexcode, without the symbol!',
                type: 'string'
            }]
        });
    }
    async run(message, {text}){
        if(text.length!=7){
            message.reply("That's not a color in hexcode!");
        }
        else{
            if(text=='rcolor'){
                text = Math.floor(Math.random() * 16777215).toString(16);
            }

            var converted=Convert.rgb_hsl(Convert.hex_rgb(text.substring(1,text.length)));

            if(converted==-1){
                message.reply("Shades don't have complements!");
            }
            else{
                converted[0]+=180;
                if(converted[0]>360){
                    converted[0]-=360;
                }
                converted[0]=Math.round(converted[0]*10)/10;
            }

            message.reply("here is the complementary color to your color, "+text+": https://www.colorhexa.com/"+Convert.rgb_hex(Convert.hsl_rgb(converted)));
        }
    }
}

module.exports = complementaryColor;