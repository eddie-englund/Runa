const { Command } = require('discord-akairo');

class clearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear', 'prune'],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            channelRestriction: 'guild',
            category: 'moderation',
            description: {
                content: 'Clears 1-100 messages',
                usage: ['!clear <1-100>']
            },
            args: [
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        });
    }

    async exec(message, args) {
        if (!args.amount || args.amount < 1) {
            return message
                .reply('You need to include an amount of messages to remove!')
                .then(msg => msg.delete(5000));
        }

        try {
            await message.delete();
            await message.channel.bulkDelete(args.amount);
            return message
                .reply(`Cleared ${args.amount} messages.`)
                .then(msg => msg.delete(5000));
        } catch (e) {
            // eslint-disable-next-line no-new
            new Error('Clear command error', e);
            return message.reply('You can only delete 1-100 messages!');
        }
    }
}

module.exports = clearCommand;
