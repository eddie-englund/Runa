const { Command } = require('discord-akairo');

class RulesCommand extends Command {
    constructor() {
        super('rules', {
            aliases: ['rules', 'readme', 'r'],
            userPermissions: ['SEND_MESSAGES'],
            clientPermissions: ['SEND_MESSAGES'],
            category: 'guild',
            description: {
                content: 'Shows guild rules'
            },
            channel: 'guild'
        });
    }

    async exec(message) {
        const Guild = await this.client.getGuild(message.guild);
        const embed = await this.client.rulesEmbed(message, Guild);

        if (!Guild.guildRules || Guild.guildRules < 1) {
            return message.reply('This guild has not set any rules!');
        } else {
            return message.util.send(embed);
        }
    }
}

module.exports = RulesCommand;
