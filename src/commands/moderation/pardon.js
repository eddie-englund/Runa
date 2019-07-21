const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const User = require('../../models/user');
const msg = require('../../util/msg');

class PardonCommand extends Command {
    constructor() {
        super('pardon', {
            aliases: ['pardon', 'unwarn', 'clearwarn', 'warnclear'],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['SEND_MESSAGES'],
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason given'
                }
            ]
        });
    }

    exec(message, args) {
        if (!args.member || args.member.user.length < 1) {
            return message.reply('You need to include a valid user!');
        }
        const today = new Date();
        const channelEmbed = this.client.util
            .embed()
            .setColor(main)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription([
                `User ${message.author.tag} has pardoned ${
                    args.member.user.tag
                }`,
                `All warnings has been cleared from user ${
                    args.member.user.tag
                }`
            ])
            .addField('**Reason:**', args.reason)
            .setTimestamp(today);
        const logEmbed = this.client.util
            .embed()
            .setColor(main)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .addField('**User:**', args.member.user.username, true)
            .addField('**User id:**', args.member.user.tag, true)
            .addField('**Reason:**', args.reason, true)
            .addField('Pardoned by: ', message.author.tag, true)
            .addField('Pardoned by id: ', message.author.tag, true)
            .setTimestamp(today);

        User.findOne(
            {
                userID: message.author.id
            },
            (err, res) => {
                if (err) {
                    // eslint-disable-next-line no-new
                    return new Error(
                        'Error at User.findOne line 60 pardon.js',
                        err
                    );
                }
                if (!res) {
                    return message.reply(
                        'This user does not have any warnings!'
                    );
                } else {
                    res.warnings = 0;
                    return res
                        .save()
                        .then(msg(message, logEmbed, channelEmbed));
                }
            }
        );
        return undefined;
    }
}

module.exports = PardonCommand;
