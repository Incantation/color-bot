const commando = require('discord.js-commando');
const Convert = require('./convertlib.js');

class convert extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'convert',
            group: 'color',
            memberName: 'convert',
            description: 'Converts between notations.',
            examples: ['convert #c6649a rgb', 'convert (198,100,154) hsl', 'convert (326.9,46.2,58.4) hex'],
            args: [{
                key: 'color',
                prompt: 'give me a color in any notation (So far supports RGB, HEX, HSL)!',
                type: 'string'
            },
            {
                key: 'notation',
                prompt: 'give me the notation you wish to convert to (So far supports RGB, HEX, HSL)!',
                type: 'string'
            }]
        });
    }
    async run(message, { color, notation }) {
        if (color.includes('#')) { //implies HEX
            color = color.substring(1, color.length);
            if (notation == 'rgb') {
                message.reply(color + ' in RGB notation: (' + Convert.hex_rgb(color) + ')');
            }
            else if (notation == 'hsl') {
                message.reply(color + ' in HSL notation: (' + Convert.rgb_hsl(Convert.hex_rgb(color)) + ')');
            }
            else{
                message.reply("Don't be silly.");
            }
        }
        else if (color.includes(',')) { //implies RGB or HSL
            var valone = color.substring(1, color.indexOf(','));
            var valtwo = color.substring(valone.length+2, color.length).substring(0, color.substring(valone.length+2, color.length).indexOf(","));
            var valthr = color.substring(valone.length+valtwo.length+3, color.length-1);
            if (color.includes('.')) { //implies HSL
                if (notation == 'rgb') {
                    message.reply(color + ' in RGB notation: (' + Convert.hsl_rgb([valone,valtwo,valthr]) + ')');
                }
                else if (notation == 'hex') {
                    message.reply(color + ' in HEX notation: (' + Convert.rgb_hex(Convert.hsl_rgb([valone,valtwo,valthr])) + ')');
                }
                else{
                    message.reply("Don't be silly.");
                }
            }
            else { //implies RGB
                if (notation == 'hsl') {
                    message.reply(color + ' in HSL notation: (' + Convert.rgb_hsl([valone,valtwo,valthr]) + ')');
                }
                else if (notation == 'hex') {
                    message.reply(color + ' in HSL notation: (' + Convert.rgb_hex([valone,valtwo,valthr]) + ')');
                }
                else{
                    message.reply("Don't be silly.");
                }
            }
        }
        else {
            message.reply("Invalid notation! Check your input. Maybe you forgot a #, or brackets?");
        }
    }
}

module.exports = convert;