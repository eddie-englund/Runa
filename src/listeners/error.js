const { Listener } = require('discord-akairo');
class ErrorEventListener extends Listener {
    constructor() {
        super('Error', {
            event: 'error',
            emitter: 'client'
        });
    }

    exec(error) {
        this.client.logger.error({ event: 'error' }`${error}`);
    }
}

module.exports = ErrorEventListener;
