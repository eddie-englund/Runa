const {
    Listener
} = require('discord-akairo');

class lackOfPerms extends Listener {
    constructor() {
        super('Missing perms', {
            emitter: 'commandHandler',
            eventName: 'commandBlocked'
        });
    }

    exec(message, command, reason) {
        console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}!`);
        return message.reply('Opps! Looks like something went wrong!');
    }
}