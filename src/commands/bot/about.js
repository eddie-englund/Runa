/* eslint-disable no-sparse-arrays */
const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'bot', 'runa'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            category: 'bot',
            description: {
                content: 'About me, Runa.'
            },
            channel: 'guild'
        });
    }

    exec(message) {
        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(main)
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription([
                '**Hi! My name is Runa and I\'m a moderation bot**!',
                '',
                'You can read more about me here: https://github.com/TitusEntertainment/Runa',
                '',,
                'By default the prefix that I react to is: **!**',
                '',
                'To get help with commands write **@runa help** or **!help**.',
                ''
            ])
            .setFooter('Created by https://github.com/TitusEntertainment')
            .setTimestamp(today);
        return message.channel.send(embed);
    }
}

module.exports = AboutCommand;
