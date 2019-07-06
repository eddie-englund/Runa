const { Command } = require('discord-akairo');
const User = require('../../models/user');
const { main } = require('../../../colors.json');

class banCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban', 'hammer'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'memberMention'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest',
                    default: ''
                }
            ]
        });
    }

    async exec (message, args) {
        if (!args.member) return message.reply('You need to include a user!');
        
        const today = new Date;
        const embed = this.client.util.embed()
            .setColor(main)
            .setAuthor(`Banned user: ${args.member.user.username}`, args.member.user.displayAvatarURL)
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**Username**:', args.member.user.username, true)
            .addField('**User Discriminator**:', args.member.user.discriminator, true)
            .addField('**User CreatedAt**', args.member.user.createdAt, true)
            .addField('**Banned by**:', message.author.username)
            .addField('**Banned by (id)', message.author.id, true)
            .addField('**Reason**', args.reason, true)
            .setTimestamp(today)
            .setFooter(`Warned by ${message.author.username}, id: ${message.author.id}`);

        function banEmbedFunction() {
            message.channel.send(`Banned user: ${args.member.username}`);
            const modLogs = message.guild.channels.filter(c => c.type === 'text').find(x => x.name === 'modlogs');
            const logs = message.guild.channels.filter(c => c.type === 'text').find(x => x.name === 'logs');

            if (modLogs) {
                return modLogs.send(embed);
            } else if (logs) {
                return logs.send(embed);
            } else {
                return;
            }
        }
        
        User.findOne({
            guildID: message.guild.id,
            userID: args.member.user.id
        }, (err, res) => {
            if (err) new Error('Failed at User.findOne() in ban.js', err);
            if (!res) {
                return args.member.ban().then(banEmbedFunction());
            } else {
                args.member.ban();
                return res.deleteOne({
                    userID: args.mebmer.user.id,
                    guildID: message.author.id
                }).then(res.save().catch(e => new Error('Failed deleted user at line 40 ban.js', e))).then(banEmbedFunction());
            }
        }); 
        
    }
}