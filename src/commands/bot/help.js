const {
    Command
} = require('discord-akairo');
const {
    main
} = require('../../../colors.json');

class helpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp', 'h'],
            clientPermissions: ['SEND_MESSAGES'],
            category: 'bot',
            args: [{
                id: 'CommandName',
                type: 'commandAlias',
                prompt: {
                    start: 'Which command do you need help with?',
                    retry: 'Please provide a valid command.',
                    optional: true
                }
            }],
            description: {
                content: 'Displays a list of commands or information about a command.',
                usage: '[y/help <optional command name>]',
            }
        });
    }

    exec(message, {
        command
    }) {
        if (!command) return this.execCommandList(message);
        // eslint-disable-next-line prefer-const
        const prefix = this.handler.prefix(message);
        // eslint-disable-next-line no-undef
        const description = Object.assign({
            content: 'No description avalible.',
            usage: '',
            examples: [],
            fields: []
        }, command.description);

        const embed = this.client.util.embed()
            .setColor(main)
            .setTitle(`\`${prefix}${command.aliases[0]} ${description.usage}\``)
            .addField('Description', description.content);

        for (const field of description.fields) embed.addField(field.name, field.value);

        if (description.examples.length) {
            const text = `${prefix}${command.aliases[0]}`;
            embed.addField('Examples', `\`${text} ${description.examples.join(`\`\n\`${text} `)}\``, true);
        }

        if (command.aliases.length > 1) {
            embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
        }

        return message.channel.send({
            embed
        });
    }


    async execCommandList(message) {
        const embed = this.client.util.embed()
            .setColor(main)
            .addField('Commands:', [
                'To view details for a command, do `y/help <command>`.'
            ]);

        for (const category of this.handler.categories.values()) {
            const title = {
                bot: '\u2000Bot',
                moderation: '\u2000Moderation',
            } [category.id];

            if (title) embed.addField(title, `\`${category.map(cmd => cmd.aliases[0]).join('` `')}\``);
        }
        return message.reply(embed);
    }
}

module.exports = helpCommand;