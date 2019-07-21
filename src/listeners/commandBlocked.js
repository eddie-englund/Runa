const { Listener } = require('discord-akairo');
const logger = require('../util/winston');

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
            logger.info(
                `User: ${message.author.tag} got blocked from using ${command} becuse of ${reason}`,
                { event: 'command blocked' }
            );
            return message.reply(
                `You've been blocked from using the command ${command} because of ${reason}`
            );
        }
    }
}

module.exports = CommandBlockedListener;
