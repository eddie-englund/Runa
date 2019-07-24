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
        // eslint-disable-next-line no-unused-vars
        if (message.author.bot) return;
    }
}

module.exports = MessageEvent;
