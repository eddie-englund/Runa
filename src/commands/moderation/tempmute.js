const { Command } = require('discord-akairo');
const ms = require('ms');

class TempMuteCommand extends Command {
    constructor() {
        super('tempmute', {
            aliases: ['tempmute', 'tmpmute', 'tmp', 'mute'],
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: [
                'MANAGE_MESSAGES',
                'MANAGE_CHANNELS',
                'MANAGE_ROLES',
                'MANAGE_CHANNELS'
            ],
            category: 'moderation',
            description: {
                content: 'Mutes a user for a defined amount of time',
                usage: ['<@user> <amount of time> <reason>']
            },
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'time',
                    default: '5m'
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
    async exec(message, args) {
        if (!args.member || args.member.length < 1) {
            return message.reply('You must include a valid user!');
        } else if (!args.time || args.time.length < 1) {
            return message.reply('You need to include a time value argument!');
        }

        const tomute = args.member;
        const today = new Date();

        let muterole = message.guild.roles.find(muted => muted.name === 'muted');
        if (!muterole) {
            try {
                // eslint-disable-next-line require-atomic-updates
                muterole = await message.guild.createRole({
                    name: 'muted',
                    color: '#f42c75',
                    permissions: []
                });
                message.guild.channels.forEach(async channel => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }

        const channelEmbed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(
                `${args.member.user.username} has been muted for ${args.time}`,
                args.member.user.displayAvatarURL
            )
            .addField('**Reason**:', args.reason, true)
            .addField('**Mute time**:', args.time, true)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setTimestamp(today);

        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(
                `${args.member.user.username} has been muted`,
                args.member.user.displayAvatarURL
            )
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**Username**:', args.member.user.username, true)
            .addField('**User Discriminator**:', args.member.user.discriminator, true)
            .addField('**Muted for**:', args.reason, true)
            .addField('**Muted by**:', message.author.username, true)
            .addField('**Mute time**:', args.time, true)
            .addField('**User account created at**', args.member.user.createdAt, true)
            .setTimestamp(today)
            .setFooter(`Muted by ${message.author.username}, id: ${message.author.id}`);
        const unmuted = `<@${tomute.id}> has been unmuted!`;
        await tomute.addRole(muterole.id);
        this.client.msg(message, embed, channelEmbed);

        return setTimeout(() => {
            tomute.removeRole(muterole.id);
            this.client.log(message, unmuted);
        }, ms(args.time));
    }
}

module.exports = TempMuteCommand;
