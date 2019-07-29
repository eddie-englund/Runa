/* eslint-disable no-sparse-arrays */
const { Command } = require('discord-akairo');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'bot', 'runa', 'info'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            category: 'bot',
            description: {
                content: 'Sends a about me, Runa.'
            },
            channel: 'guild'
        });
    }

    exec(message) {
        this.handler.prefix(message).then(prefix => {
            const today = new Date();
            const embed = this.client.util
                .embed()
                .setColor(this.client.color.blue)
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setThumbnail(this.client.user.displayAvatarURL())
                .setDescription([
                    '**Hi! My name is Runa and I\'m a moderation bot**!',
                    '',
                    'You can read more about me here: https://github.com/TitusEntertainment/Runa',
                    '',,

                    `By default the prefix that I react to is: **!**, the prefix in this guild is **${prefix}**`,
                    '',
                    `To get help with commands write **@runa help** or **${prefix}help**.`,
                    ''
                ])
                .setFooter('Created by https://github.com/TitusEntertainment')
                .setTimestamp(today);
            return message.channel.send(embed);
        });
    }
}

module.exports = AboutCommand;
