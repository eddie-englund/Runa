const { Command } = require('discord-akairo');

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
            return message
                .reply('You need to include a member to kick!')
                .then(msg => msg.delete(5000));
        }

        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(args.member.user.username, args.member.user.displayAvatarURL)
            .addField('Kicked user: ', args.member.user.username, true)
            .addField('Kicked userID:', args.member.user.id, true)
            .addField('Kicked by:', message.author.username)
            .addField('Kicked by id:', message.author.id)
            .setTimestamp(today);

        return args.member
            .kick({ reason: args.reason })
            .then(this.client.msg(message, embed))
            .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
    }
}

module.exports = kickCommand;
