const { Command } = require('discord-akairo');

class LookUpCommand extends Command {
    constructor() {
        super('lookup', {
            aliases: ['lookup', 'userinfo', 'userseach', 'vet'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['KICK_MEMBERS'],
            category: 'guild',
            description: {
                content: 'Looks up a user and retrives info about that user',
                usage: ['<@user>']
            },
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            channel: 'guild'
        });
    }

    exec(message, args) {
        if (!args.member || args.member.length < 1) {
            return message.reply('Please mention a valid user.');
        }
        const User = args.member;
        const today = new Date();
        const embed = message.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(User.user.displayAvatarURL())
            .addField('**User**:', User.user.tag, true)
            .addField('**Username**: ', User.user.username, true)
            .addField('**User id**:', User.user.id, true)
            .addField('**Discriminator**:', User.user.discriminator, true)
            .addField('**User account created at**:', User.user.createdAt, true)
            .setTimestamp(today);
        return message.util.send(embed);
    }
}

module.exports = LookUpCommand;
