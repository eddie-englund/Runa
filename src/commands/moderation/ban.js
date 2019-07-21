const { Command } = require('discord-akairo');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const { main } = require('../../../colors.json');
const msg = require('../../util/msg');

class banCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban', 'hammer'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channelRestriction: 'guild',
            category: 'moderation',
            description: {
                content: 'Bans a user',
                usage: ['<@user> <reason>']
            },
            args: [
                {
                    id: 'member',
                    type: 'memberMention'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest',
                    default: 'No reason defined'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (!args.member) return message.reply('You need to include a user!');

        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(main)
            .setAuthor(
                `Banned user: ${args.member.user.username}`,
                args.member.user.displayAvatarURL
            )
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**Username**:', args.member.user.username, true)
            .addField(
                '**User Discriminator**:',
                args.member.user.discriminator,
                true
            )
            .addField('**User CreatedAt**', args.member.user.createdAt, true)
            .addField('**Banned by**:', message.author.username)
            .addField('**Banned by (id)**:', message.author.id, true)
            .addField('**Reason**:', args.reason, true)
            .setTimestamp(today)
            .setFooter(
                `Banned by ${message.author.username}, id: ${message.author.id}`
            );

        await User.findOne(
            {
                guildID: message.guild.id,
                userID: args.member.user.id
            },
            (err, res) => {
                // eslint-disable-next-line no-new
                if (err) new Error('Failed at User.findOne() in ban.js', err);
                if (!res) {
                    return args.member.ban().then(msg(message, embed));
                } else {
                    message.guild.ban(args.member.member, 2);
                    return res
                        .deleteOne({
                            userID: args.member.user.id,
                            guildID: message.author.id
                        })
                        .then(res.save())
                        .then(msg(message, embed), args.member.ban())
                        .catch(
                            e =>
                                new Error(
                                    'Failed deleted user at line 40 ban.js',
                                    e
                                )
                        );
                }
            }
        ).then(
            Guild.findOne(
                {
                    guildID: message.guild.id
                },
                (res, err) => {
                    if (err) {
                        // eslint-disable-next-line no-new
                        new Error(
                            'Error at Guild.findOne() at line 96 ban.js',
                            err
                        );
                    }

                    if (!res) {
                        const newGuild = new Guild({
                            guildID: message.guild.id,
                            guildOwner: message.guild.owner.username,
                            guildOwnerID: message.guild.ownerid,
                            guildRules: args.rules,
                            guildRulesUser: message.author.username,
                            guildRulesUserID: message.author.id,
                            bans: 1,
                            guildBans: [
                                {
                                    userID: args.member.user.id,
                                    username: args.member.user.tag,
                                    date: today
                                }
                            ],
                            date: today
                        });
                        newGuild
                            .save()
                            .catch(
                                e =>
                                    new Error(
                                        'Failed saving new guild line 121 ban.js',
                                        e
                                    )
                            );
                    } else {
                        res.bans += 1;
                        res.guildBans.push({
                            userID: args.member.user.id,
                            username: args.member.user.tag,
                            date: today
                        });
                        res.save().catch(
                            e =>
                                new Error(
                                    'Failed to save res at line 138 ban.js',
                                    e
                                )
                        );
                    }
                }
            )
        );
        return undefined;
    }
}

module.exports = banCommand;
