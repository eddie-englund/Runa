const { Command } = require('discord-akairo');

class RulesCommand extends Command {
    constructor() {
        super('rules', {
            aliases: ['rules', 'readme', 'r'],
            userPermissions: ['SEND_MESSAGES'],
            clientPermissions: ['SEND_MESSAGES'],
            category: 'guild',
            description: {
                content: 'Shows guild rules'
            },
            channel: 'guild'
        });
    }

    exec(message) {
        const today = new Date();

        this.client.model.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) this.client.logger.error({ event: 'error' }`${err}`);
                if (!res) {
                    return message.reply('This guild has not set any rules.');
                } else if (
                    res.guildRules.length === 0
                    || res.guildRules.length < 1
                    || !res.guildRules
                ) {
                    return message.reply('This guild has not set any rules.');
                }
                const embed = this.client.util
                    .embed()
                    .setColor(this.client.color.blue)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle('Guild rules')
                    .setDescription(res.guildRules)
                    .setThumbnail(message.guild.iconURL())
                    .setTimestamp(today);
                return message.channel.send(embed);
            }
        );
    }
}

module.exports = RulesCommand;
