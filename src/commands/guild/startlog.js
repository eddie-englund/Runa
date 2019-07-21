const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const Guild = require('../../models/guild.js');
const log = require('../../util/log');

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
            .setColor(main)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('Logging has now been turned on!')
            .addField('**Turned on by user**: ', message.author.tag)
            .addField('**User id**:', message.author.id)
            .setTimestamp(today);

        Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) new Error('Erro at line 24 startlog.js', err);
                if (!res) {
                    message.reply('The logs are already on!');
                } else {
                    res.guildLogActive = true;
                    res.save()
                        .then(log(message, embed))
                        .catch(
                            e =>
                                new Error(
                                    'Failed to save res at line 44 startlog.js',
                                    e
                                )
                        );
                }
            }
        );
    }
}

module.exports = StartLogCommand;
