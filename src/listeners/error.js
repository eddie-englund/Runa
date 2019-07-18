const { Listener } = require('discord-akairo');

class ErrorEventListener extends Listener {
    constructor() {
        super('Error', {
            event: 'error',
            emitter: 'client'
        });
    }

    exec(e, message) {
        message.reply(`Error: ${e.message}`);
        // eslint-disable-next-line no-console
        console.log(e);
    }
}

module.exports = ErrorEventListener;
