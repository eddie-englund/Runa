const { Listener } = require('discord-akairo');

class WarnEventListener extends Listener {
    constructor() {
        super('warn listener', {
            event: 'warn',
            emitter: 'client'
        });
    }
    exec(info) {
        this.client.logger.warn({ event: 'warn' }, info);
    }
}

module.exports = WarnEventListener;
