const { Command } = require('discord-akairo');
const msg = require('../../util/msg');
const { main } = require('../../../colors.json');

class UnbanCommand extends Command {
  constructor() {
    super('unbnan', {
      aliases: ['unban', 'unhammer'],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      category: 'moderation',
      description: {
        content: 'unbans a user',
        usage: ['<userID> <reason>']
      },
      args: [
        {
          id: 'user'
        },
        {
          id: 'reason',
          match: 'rest',
          default: 'No reason given'
        }
      ]
    });
  }

  exec(message, args, clientPermissions) {
    if (!args.user || args.user.length < 1)
      return message.reply(
        'You need to include a userResolvable, such as a userID you can get this from the logs'
      );
    const today = new Date();
    const embed = this.client.util
      .embed()
      .setColor(main)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`User: <@${args.user}> has been unbanned`)
      .addField('**Unbanned by:**', message.author)
      .addField('**Reason:**', args.reason)
      .setThumbnail(this.client.user.displayAvatarURL)
      .setTimestamp(today);

    message.guild.members.unban(args.user, args.reason).catch(e => {
      if (e) {
        console.log(e);
        return message.reply(
          `Something went wrong! Error message: ${e.message}`
        );
      } else {
        msg(message, embed);
      }
    });
  }
}

module.exports = UnbanCommand;
