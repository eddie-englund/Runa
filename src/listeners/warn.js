const { Listener } = require('discord-akairo');
const logger = require('../util/winston');

class WarnEventListener extends Listener {
    constructor() {
        super('warn listener', {
            event: 'warn',
            emitter: 'client'
        });
    }
    exec(info) {
        logger.warn({ event: 'warn' }, info);
    }
}

module.exports = WarnEventListener;
