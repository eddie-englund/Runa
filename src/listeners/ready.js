const { Listener } = require('discord-akairo');

class ReadyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.user.setActivity('!help', { type: 'LISTENING' });
        this.client.logger.info('Runa bot has connected');
    }
}

module.exports = ReadyEvent;
