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
                usage: ['prefix <new prefix>', 'log <new log channel name>']
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
        case 'log': {
            if (!args.newSetting || args.newSetting.length < 1) {
                return message.util.send(`Current log chanel is \`\`${settings.guildLog}`);
            }

            const cChannel = message.guild.channels
                .filter(x => x.type === 'text')
                .find(x => x.name === args.cName);

            if (!cChannel) {
                return message.reply('Please include a valid channel name');
            }

            const guildEmbed = this.client.util
                .embed()
                .setColor(this.client.color.blue)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(
                    `A new log channel has been set! The new channel is ${args.newSetting}`
                )
                .setTimestamp(Date());
            try {
                await this.client.updateGuild(message.guild, { guildLog: args.newSetting });
                this.client.msg(guildEmbed);
            } catch (e) {
                this.client.logger.error({ event: 'error' }`${e}`);
                return message.reply(
                    `Looks like something went wrong! Error message: ${e.message}`
                );
            }
            break;
        }
        case 'rules': {
            const embed = await this.client.rulesEmbed(message, settings);
            if (!args.newSetting || args.newSetting.length.length < 1) {
                return message.util.send(embed);
            }
            const newRulesEmbed = await this.client.newRulesEmbed(message, settings);
            try {
                await this.client.updateGuild(message.guild, { guildRules: args.newSetting });
                message.util.send(newRulesEmbed);
            } catch (e) {
                return message.reply(
                    `Looks like something went wrong! Error message: ${e.message}`
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
