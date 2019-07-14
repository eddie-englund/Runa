const { Command } = require('discord-akairo');
const Guild = require('../../models/guild');
const { main } = require('../../../colors.json');

class RulesCommand extends Command {
  constructor() {
    super('rules', {
      aliases: ['rules', 'readme', 'r'],
      userPermissions: ['SEND_MESSAGES'],
      clientPermissions: ['SEND_MESSAGES']
    });
  }

  exec(message) {
    const today = new Date();
    const embed = this.client.util
      .embed()
      .setColor(main)
      .setAuthor(message.author.displayname, message.author.displayAvatarURL)
      .setTitle('Guild rules')
      .addField('Rules: ', res.guildRules)
      .setTimestamp(today);

    Guild.findOne(
      {
        guildID: message.guild.id
      },
      (err, res) => {
        if (err) new Error('Error at line 17 Guild.findOne rules.js', err);
        if (!res) return message.reply('This guild has not set any rules.');
        if (
          res.guildRules.length === 0 ||
          res.guildRules.length < 1 ||
          !res.guildRules
        )
          return message.reply('This guild has not set any rules.');
        return message.channel.send(embed);
      }
    );
  }
}

module.exports = RulesCommand;
