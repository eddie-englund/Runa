const { Command } = require('discord-akairo');
const Guild = require('../../models/guild');

class StopLogCommand extends Command {
    constructor() {
        super('stop log', {
            aliases: ['stoplog', 'nolog', 'logoff'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['BAN_MEMBERS'],
            category: 'guild',
            channel: 'guild',
            description: {
                content: 'Stops the bot from logging'
            }
        });
    }

    exec(message) {
        const today = new Date();

        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('Bot logging has been turned off.')
            .setTimestamp(today);

        Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) {
                    // eslint-disable-next-line no-new
                    new Error('Error at line 23 Guild.findOne() stoplog.js', err);
                }
                if (!res) {
                    const newGuild = new Guild({
                        guildID: message.guild.id,
                        guildOwner: message.guild.owner.username,
                        guildOwnerID: message.guild.ownerid,
                        guildRules: '',
                        guildLogActive: true,
                        guildRulesUser: '',
                        guildRulesUserID: '',
                        date: today
                    });
                    newGuild
                        .save()
                        .then(message.util.send(embed))
                        .catch(e => new Error('Error at newGuild.save() line 44 stoplog.js', e));
                } else {
                    res.guildLogActive = false;
                    res.save()
                        .then(message.util.send(embed))
                        .catch(e => new Error('Failed to save res at line 64 stoplog.js', e));
                }
            }
        );
    }
}

module.exports = StopLogCommand;
