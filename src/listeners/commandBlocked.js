const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
    constructor() {
        super('cmd block', {
            emitter: 'client',
            event: 'commandBlocked'
        });
    }

    exec(message, command, reason) {
        if (message.type === 'dm') {
            return undefined;
        } else {
            return message.reply(
                `You've been blocked from using the command ${command} because of ${reason}`
            );
        }
    }
}

module.exports = CommandBlockedListener;
