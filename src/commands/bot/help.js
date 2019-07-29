const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp', 'h'],
            clientPermissions: ['SEND_MESSAGES'],
            category: 'bot',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    prompt: {
                        start: 'Which command do you need help with?',
                        retry: 'Please provide a valid command.',
                        optional: true
                    }
                }
            ],
            description: {
                content: 'Displays a list of commands or information about a command.',
                usage: '[<optional command name>]'
            },
            channel: 'guild'
        });
    }

    exec(message, { command }) {
        if (!command) return this.execCommandList(message);
        this.handler.prefix(message).then(e => {
            const prefix = e;
            // eslint-disable-next-line no-undef
            const description = Object.assign(
                {
                    content: 'No description avalible.',
                    usage: '',
                    examples: [],
                    fields: []
                },
                command.description
            );

            const embed = this.client.util
                .embed()
                .setColor(this.client.color.blue)
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
                .setTitle(`\`${prefix}${command.aliases[0]} ${description.usage}\``)
                .setThumbnail(this.client.user.displayAvatarURL())
                .addField('Description', description.content);

            for (const field of description.fields) {
                embed.addField(field.name, field.value);
            }

            if (description.examples.length) {
                const text = `${prefix}${command.aliases[0]}`;
                embed.addField(
                    'Examples',
                    `\`${text} ${description.examples.join(`\`\n\`${text} `)}\``,
                    true
                );
            }

            if (command.aliases.length > 1) {
                embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
            }

            return message.channel.send({
                embed
            });
        });
        return undefined;
    }

    execCommandList(message) {
        this.handler.prefix(message).then(e => {
            const prefix = e;
            const embed = this.client.util
                .embed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
                .setColor(this.client.color.blue)
                .setThumbnail(this.client.user.displayAvatarURL())
                .addField('Prefix in this guild is:', `**\`\`${prefix}\`\`**`)
                .addField('Commands:', [
                    'To view the details of a command, do @Runa help <command>.'
                ]);

            for (const category of this.client.commandHandler.categories.values()) {
                const title = {
                    bot: '\u2000Bot',
                    guild: '\u2000Guild',
                    moderation: '\u2000Moderation'
                }[category.id];

                if (title) {
                    embed.addField(title, `\`${category.map(cmd => cmd.aliases[0]).join('` `')}\``);
                }
            }
            return message.channel.send(embed);
        });
    }
}

module.exports = HelpCommand;
