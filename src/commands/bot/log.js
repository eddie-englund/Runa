const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const Guild = require('../../models/guild');

class SetLogCommand extends Command {
    constructor() {
        super('Set log', {
            aliases: ['log', 'setlog', 'newlog', 'logchannel'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: 'cName',
                    type: 'string'
                }
            ]
        });
    }

    exec(message, args) {
        if (!args.cName || args.cName.length < 1) {
            return message.reply('Yo need to include a channel name!');
        }

        const cChannel = message.guild.channels
            .filter(x => x.type === 'text')
            .find(x => x.name === args.cName);

        if (!cChannel) {
            return message.reply('Please include a valid channel name');
        }

        const guildEmbed = this.client.util
            .embed()
            .setColor(main)
            .setTitle('A new log channel has been set!')
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setDescription(
                `A new log channel has been set! The new channel is ${
                    args.cName
                }`
            )
            .setThumbnail(Date());

        Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) {
                    // eslint-disable-next-line no-new
                    new Error('Error at Guild.findOne() line 27 log.js', err);
                }
                if (!res) {
                    const newGuild = new Guild({
                        guildID: message.guild.id,
                        guildOwner: message.guild.owner.username,
                        guildOwnerID: message.guild.owner.id,
                        guildRules: '',
                        guildRulesUser: '',
                        guildRulesUserID: '',
                        guildLog: args.cName,
                        date: Date()
                    });
                    newGuild
                        .save()
                        .then(message.reply(guildEmbed))
                        // eslint-disable-next-line no-console
                        .catch(e => console.log(e));
                } else {
                    res.guildLog = args.cName;
                    res.save()
                        .then(message.reply(guildEmbed))
                        // eslint-disable-next-line no-console
                        .catch(e => console.log(e));
                }
            }
        );
        return undefined;
    }
}

module.exports = SetLogCommand;
