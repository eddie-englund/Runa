const { Command } = require('discord-akairo');

class SetupCommand extends Command {
    constructor() {
        super('setup', {
            aliases: ['setup', 'init'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async exec(message) {
        try {
            await this.client.emit('guildCreate', message.guild);
            return message.reply('This guild has been initated');
        } catch (e) {
            return message.reply(`Error: ${e.message}`);
        }
    }
}

module.exports = SetupCommand;
