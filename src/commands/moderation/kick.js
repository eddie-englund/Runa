const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const msg = require('../../util/msg');

class kickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    default: 'No reason defined'
                }
            ],
            category: 'moderation',
            description: {
                content: 'Kicks a user',
                usage: ['<@user> <reason>']
            },
            channel: 'guild'
        });
    }

    exec(message, args) {
        if (!args.member || args.member.length < 1) {
            return (
                message
                    .reply('You need to include a member to kick!')
                    // eslint-disable-next-line no-shadow
                    .then(msg => msg.delete(5000))
            );
        }

        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(main)
            .setAuthor(
                args.member.user.username,
                args.member.user.displayAvatarURL
            )
            .addField('Kicked user: ', args.member.user.username, true)
            .addField('Kicked userID:', args.member.user.id, true)
            .addField('Kicked by:', message.author.username)
            .addField('Kicked by id:', message.author.id)
            .setTimestamp(today);

        return args.member.user
            .kick()
            .then(msg(message, embed))
            .catch(e => new Error('Failed to kick user', e));
    }
}

module.exports = kickCommand;
