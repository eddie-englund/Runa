/* eslint-disable no-useless-return */
const { Listener } = require('discord-akairo');

class MessageEvent extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    exec(message) {
        if (message.author.bot || !message.guild) return;
    }
}

module.exports = MessageEvent;
