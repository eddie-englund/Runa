const { Command } = require('discord-akairo');
const ms = require('ms');

class TemporaryBanCommand extends Command {
    constructor() {
        super('tempban', {
            aliases: ['tempban', 'temporaryban', 'temphammer'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            category: 'moderation',
            description: {
                content: 'Temporarily bans a user',
                usage: ['<@user> <time> <reason>']
            },
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'time',
                    default: '1d'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason given'
                }
            ],
            channel: 'guild'
        });
    }
    exec(message, args) {
        if (!args.member || args.member.length < 1) {
            return message.reply('Please mention a valid user');
        }

        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .addField('**Tempbanned user**: ', args.member.user.tag, true)
            .addField('**Tempbanned userID**: ', args.member.user.id, true)
            .addField('**Reason**:', args.reason)
            .addField('**Tempbanned by: ', message.author.username, true)
            .addField('**Tempbanned by ID: ', message.author.id, true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp(today);
        message.guild.ban(args.member.user.id, 2).then(this.client.msg(message, embed));

        return setTimeout(() => {
            message.guild.unban(args.member.user.id);
        }, ms(args.time));
    }
}

module.exports = TemporaryBanCommand;
