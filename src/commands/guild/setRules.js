const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const Guild = require('../../models/guild.js');
const msg = require('../../util/msg');

class newRulesCommand extends Command {
  constructor() {
    super('guildRules', {
      aliases: ['setrules', 'guildrules', 'serverrules', 'srules'],
      clientPermissions: ['SEND_MESSAGES'],
      userPermissions: ['ADMINISTRATOR'],
      args: [
        {
          id: 'rules',
          match: 'content'
        }
      ],
      category: 'guild',
      description: {
        content: 'Saves guild rules',
        usage: ['<rules>']
      }
    });
  }
  exec(message, args) {
    if (!args.rules || args.rules.length < 1)
      return message.reply('You need to include the new rules!');

    if (!args.rules.length > 6000)
      return message.reply(
        'You cannot exceed 6000 characters (including spaces, dots, and other miscellaneous characters)'
      );

    const today = new Date();
    const embed = this.client.util
      .embed()
      .setColor(main)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(
        'A admin has set new rules! Check them out with the rules command'
      )
      .addField('**User**:', message.author.username, true)
      .addField('**UserID**: ', message.author.id, true)
      .setTimestamp(today);

    Guild.findOne(
      {
        guildID: message.guild.id
      },
      (err, res) => {
        if (err) new Error('Error at Guild.findOne rules.js line 29', err);
        if (!res) {
          const newGuild = new Guild({
            guildID: message.guild.id,
            guildOwner: message.guild.owner.username,
            guildOwnerID: message.guild.ownerid,
            guildRules: args.rules,
            guildRulesUser: message.author.username,
            guildRulesUserID: message.author.id,
            date: today
          });
          return newGuild
            .save()
            .then(msg(message, embed))
            .catch(e => new Error('Failed to save newGuild in rules.js', e));
        } else {
          res.guildRules = args.rules;
          res.guildRulesUser = message.author.username;
          res.guildRulesUserID = message.author.id;
          return res
            .save()
            .then(msg(message, embed))
            .catch(e => new Error('Failed to save new res', e));
        }
      }
    );
  }
}

module.exports = newRulesCommand;
