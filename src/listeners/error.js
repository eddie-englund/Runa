const { Listener } = require('discord-akairo');
const logger = require('../util/winston');
class ErrorEventListener extends Listener {
    constructor() {
        super('Error', {
            event: 'error',
            emitter: 'client'
        });
    }

    exec(error) {
        logger.error({ event: 'error' }, error.message, error);
    }
}

module.exports = ErrorEventListener;
