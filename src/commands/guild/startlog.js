const { Command } = require('discord-akairo');

class StartLogCommand extends Command {
    constructor() {
        super('start log', {
            aliases: ['startlog', 'uselog'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS'],
            channel: 'guild',
            category: 'guild',
            description: {
                content:
                    'starts logging to either a channel name modlogs or a defined one with the setRules command'
            }
        });
    }

    exec(message) {
        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('Logging has now been turned on!')
            .addField('**Turned on by user**: ', message.author.tag)
            .addField('**User id**:', message.author.id)
            .setTimestamp(today);

        this.client.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) this.client.logger.error({ event: 'error' }`${err}`);
                if (!res || res.guildLogActive === true) {
                    message.reply('The logs are already on!');
                } else {
                    res.guildLogActive = true;
                    res.save()
                        .then(this.client.log(message, embed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                }
            }
        );
    }
}

module.exports = StartLogCommand;
