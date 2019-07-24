const { Command } = require('discord-akairo');

class ConfigCommand extends Command {
    constructor() {
        super('config', {
            aliases: ['config'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_GUILD'],
            args: [
                {
                    id: 'settings'
                },
                {
                    id: 'newSetting'
                }
            ],
            channel: 'guild',
            category: 'guild',
            description: {
                content: '**shows** or **sets**guild specific settings like the prefix.',
                usage: ['prefix <new prefix>']
            }
        });
    }

    async exec(message, args) {
        const settings = await this.client.getGuild(message.guild);
        switch (args.settings) {
        case 'prefix': {
            if (!args.newSetting || args.newSetting.lenth < 1) {
                return message.util.send(`Current prefix is: \`\`${settings.prefix}\`\``);
            }
            try {
                await this.client.updateGuild(message.guild, { prefix: args.newSetting });
                message.reply(`Prefix has been set to: \`\`${args.newSetting}\`\``);
            } catch (e) {
                message.reply(
                    `An error has occured. Error message: ${e.message}. Please use the setup command to create a db instance for this guild. The issue is likley to be a result of the bot being offline when the bot joined the guild and thereby didn't create a db instance`
                );
            }
            break;
        }
        default: {
            message.reply('Please provide a valid setting to view/update');
            break;
        }
        }
        return undefined;
    }
}

module.exports = ConfigCommand;
