const { Command } = require('discord-akairo');

class SetupCommand extends Command {
    constructor() {
        super('setup', {
            aliases: ['setup', 'init'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_GUILD'],
            category: 'guild',
            channel: 'guild',
            description: {
                content: 'Creates a db instance for the guild (fail safe)'
            }
        });
    }

    async exec(message) {
        // eslint-disable-next-line new-cap
        await this.client.model.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) this.client.logger.error({ event: 'error' }`${err}`);
                if (!res) {
                    return this.guildExec(message);
                } else {
                    return message.reply('This guild already has a db instance.');
                }
            }
        );
    }

    async guildExec(message) {
        try {
            await this.client.emit('guildCreate', message.guild);
            return message.reply('This guild has been initated');
        } catch (e) {
            return message.reply(`Error: ${e.message}`);
        }
    }
}

module.exports = SetupCommand;
