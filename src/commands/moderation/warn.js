const { Command } = require('discord-akairo');

class warnCommand extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            channelRestriction: 'guild',
            category: 'moderation',
            description: {
                content: 'Warns a user',
                usage: ['!warn <@user> <reason>']
            },
            args: [
                {
                    id: 'member',
                    type: 'memberMention'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    default: ''
                }
            ],
            channel: 'guild'
        });
    }

    exec(message, args) {
        if (!args.member) return message.reply('Please, provide a vaild user.');
        if (args.member.user.bot) {
            return message.reply('Warning bots is prohibited.');
        }
        const today = new Date();

        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(
                `${args.member.user.username} has been warned`,
                args.member.user.displayAvatarURL
            )
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**Username**:', args.member.user.username, true)
            .addField('**User Discriminator**:', args.member.user.discriminator, true)
            .addField('**User CreatedAt**', args.member.user.createdAt, true)
            .setTimestamp(today)
            .setFooter(`Warned by ${message.author.username}, id: ${message.author.id}`);

        const kickEmbed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(
                `Kicked user ${args.member.user.username}`,
                args.member.user.displayAvatarURL
            )
            .addField('**User**:', args.member.user.username, true)
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**User Discriminator**:', args.member.user.discriminator, true)
            .addField('**User Account created at**:', args.member.user.createdAt, true)
            .addField('**Reason**:', 'Exceeded 2 warnings')
            .setTimestamp(today);

        const banEmbed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(
                `Banned user ${args.member.user.username}`,
                args.member.user.displayAvatarURL
            )
            .addField('**User**:', args.member.user.username, true)
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**User Discriminator**:', args.member.user.discriminator, true)
            .addField('**User Account created at**:', args.member.user.createdAt, true)
            .addField('**Reason**:', 'Exceeded 3 warnings')
            .setTimestamp(today);

        this.client.model.User.findOne(
            {
                userID: args.member.user.id,
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) throw new Error('MongoDB error at warn.js line 76-80');
                if (!res) {
                    const newUser = new this.client.model.User({
                        userID: args.member.user.id,
                        username: args.member.user.username,
                        guildID: message.guild.id,
                        warnings: 1,
                        warners: [
                            {
                                userID: message.author.id,
                                username: message.author.username,
                                date: today
                            }
                        ],
                        warnDate: today,
                        reports: 0,
                        reporters: [],
                        reportDate: [],
                        createdAt: today
                    });
                    return newUser
                        .save()
                        .catch(e => new Error('newUser failed to save', e))
                        .then(this.client.msg(message, embed));
                } else {
                    res.warnings += 1;
                    res.warners.push({
                        userID: message.author.id,
                        username: message.author.username,
                        date: today
                    });
                    res.warnDate.push(today);
                    switch (res.warnings) {
                    case 2:
                        embed.addField(
                            'Kick',
                            'If you exceed two warnings you will be kicked from the server.'
                        );
                        break;
                    case 3:
                        args.member
                            .kick()
                            .then(this.client.msg(message, kickEmbed))
                            .catch(e => new Error('Failed to kicked user', e));
                        break;
                    case 4:
                        args.meber
                            .ban()
                            .then(this.client.msg(message, banEmbed))
                            .catch(e =>
                                this.client.logger.error(
                                    { event: 'error' },
                                    `Error message: ${e.message}`,
                                    `Error: ${e}`
                                )
                            );
                    }

                    return res
                        .save()
                        .catch(e => new Error('res.save at warn.js failed to save', e))
                        .then(this.client.msg(message, embed))
                        .catch(e => new Error('Failed to kick user', e));
                }
            }
        );
        return undefined;
    }
}

module.exports = warnCommand;
