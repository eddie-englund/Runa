const { Command } = require('discord-akairo');

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
                    type: 'memberMention',
                    prompt: 'You need to include a valid user!'
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
            .setColor(this.client.color.blue)
            .setAuthor(
                `Banned user: ${args.member.user.username}`,
                args.member.user.displayAvatarURL
            )
            .addField('**UserID**:', args.member.user.id, true)
            .addField('**Username**:', args.member.user.username, true)
            .addField('**User discriminator**:', args.member.user.discriminator, true)
            .addField('**User created ast**', args.member.user.createdAt, true)
            .addField('**Banned by**:', message.author.username)
            .addField('**Banned by (id)**:', message.author.id, true)
            .addField('**Reason**:', args.reason, true)
            .setTimestamp(today)
            .setFooter(`Banned by ${message.author.username}, id: ${message.author.id}`);

        const banInfo = {
            userID: args.member.user.id,
            username: args.member.user.tag,
            date: today
        };

        await this.client.deleteUser(message.guild, args.member.user);
        const Guild = await this.client.getGuild(message.guild);
        const newBans = Guild.bans += 1;
        await this.client.updateGuild(message.guild, { bans: newBans, guildBans: [banInfo] });
        return args.member
            .ban({ days: 3, reason: args.reason })
            .then(this.client.msg(message, embed));
    }
}

module.exports = banCommand;
