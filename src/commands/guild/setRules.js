const { Command } = require('discord-akairo');

class newRulesCommand extends Command {
    constructor() {
        super('guildRules', {
            aliases: ['setrules', 'newrules', 'guildrules', 'serverrules', 'srules'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'rules',
                    match: 'content'
                }
            ],
            category: 'guild',
            description: {
                content: 'Set\'s guild rules',
                usage: ['<rules>']
            },
            channel: 'guild'
        });
    }
    exec(message, args) {
        if (!args.rules || args.rules.length < 1) {
            return message.reply('You need to include the new rules!');
        }

        if (!args.rules.length > 6000) {
            return message.reply(
                'You cannot exceed 6000 characters (including spaces, dots, and other miscellaneous characters)'
            );
        }

        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription('A admin has set new rules! Check them out with the rules command')
            .addField('**User**:', message.author.username, true)
            .addField('**UserID**: ', message.author.id, true)
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
                        guildRules: args.rules,
                        guildLogActive: true,
                        guildRulesUser: message.author.username,
                        guildRulesUserID: message.author.id,
                        date: today
                    });
                    return newGuild
                        .save()
                        .then(this.client.msg(message, embed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                } else {
                    res.guildRules = args.rules;
                    res.guildRulesUser = message.author.username;
                    res.guildRulesUserID = message.author.id;
                    return res
                        .save()
                        .then(this.client.msg(message, embed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                }
            }
        );
        return undefined;
    }
}

module.exports = newRulesCommand;
