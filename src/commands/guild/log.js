const { Command } = require('discord-akairo');

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
            ],
            category: 'guild',
            description: {
                content: 'Sets a new log channel',
                usage: ['<channel name>']
            },
            channel: 'guild'
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
            .setColor(this.client.color.blue)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`A new log channel has been set! The new channel is ${args.cName}`)
            .setTimestamp(Date());

        this.client.model.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) {
                    // eslint-disable-next-line no-new
                    new Error('Error at Guild.findOne() line 27 log.js', err);
                }
                if (!res) {
                    const newGuild = new this.client.model.Guild({
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                        guildRules: '',
                        guildRulesUser: '',
                        guildRulesUserID: '',
                        guildLogActive: true,
                        guildLog: args.cName,
                        date: Date()
                    });
                    newGuild
                        .save()
                        .then(message.reply(guildEmbed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                } else {
                    res.guildLog = args.cName;
                    res.save()
                        .then(message.util.send(guildEmbed))
                        .catch(e => this.client.logger.error({ event: 'error' }`${e}`));
                }
            }
        );
        return undefined;
    }
}

module.exports = SetLogCommand;
