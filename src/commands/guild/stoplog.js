const { Command } = require('discord-akairo');

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

        this.client.model.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) this.client.logger.error({ event: 'error' }`${err}`);
                if (!res) {
                    const newGuild = new this.client.model.Guild({
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
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                } else {
                    res.guildLogActive = false;
                    res.save()
                        .then(message.util.send(embed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                }
            }
        );
    }
}

module.exports = StopLogCommand;
