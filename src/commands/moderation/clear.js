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
                    type: 'number',
                    prompt: {
                        start: 'You need to include an amount of messages to remove!',
                        retry: '...Really? How hard can it be? Include a number from 1-100...',
                        optional: false
                    }
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
            return message.reply(`Cleared ${args.amount} messages.`).then(msg => msg.delete(5000));
        } catch (e) {
            this.client.logger.error({ event: 'error' }`${e}`);
            return message.reply('You can only delete 1-100 messages!');
        }
    }
}

module.exports = clearCommand;
