const { Listener } = require('discord-akairo');

class WarnEventListener extends Listener {
    constructor() {
        super('warn listener', {
            event: 'warn',
            emitter: 'client'
        });
    }
    exec(e) {
        // eslint-disable-next-line no-console
        console.log('Warning: ', e);
    }
}

module.exports = WarnEventListener;
