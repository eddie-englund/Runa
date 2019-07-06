const { Command } = require('discord-akairo');

class clearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear', 'prune'],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            channelRestriction: 'guild',
            category: 'moderation',
            args: [
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        });
    }

    async exec(message, args) {
        if (!args.amount || args.amount < 1) return message.reply("You need to include an amount of messages to remove!").then(msg => msg.delete(5000));

         try {
             await message.delete();
             await message.channel.bulkDelete(args.amount);
             return message.reply(`Cleared ${args.amount} messages.`);
         } catch (e) {
             new Error('Clear command error', e);
             message.reply("You can only delete 1-100 messages!");
         }
    }
}

module.exports = clearCommand;
