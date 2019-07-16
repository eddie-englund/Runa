const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');

class kickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'reason',
          default: 'No reason defined'
        }
      ],
      category: 'moderation',
      description: {
        content: 'Kicks a user',
        usage: ['<@user> <reason>']
      }
    });
  }

  exec(message, args) {
    if (!args.member || args.member.length < 1) {
      return message
        .reply('You need to include a member to kick!')
        .then(msg => msg.delete(5000));
    }

    const today = new Date();
    const embed = this.client.util
      .embed()
      .setColor(main)
      .setAuthor(args.member.user.username, args.member.user.displayAvatarURL)
      .addField('Kicked user: ', args.member.user.username, true)
      .addField('Kicked userID:', args.member.user.id, true)
      .addField('Kicked by:', message.author.username)
      .addField('Kicked by id:', message.author.id)
      .setTimestamp(today);

    function msg() {
      const warnChannel = message.guild.channels
        .filter(c => c.type === 'text')
        .find(x => x.name === 'warnlogs');
      const modLogs = message.guild.channels
        .filter(c => c.type === 'text')
        .find(x => x.name === 'modlogs');
      const logs = message.guild.channels
        .filter(c => c.type === 'text')
        .find(x => x.name === 'logs');

      if (warnChannel) {
        return warnChannel.send(embed);
      } else if (modLogs) {
        return modLogs.send(embed);
      } else if (logs) {
        return logs.send(embed);
      } else {
        return;
      }
    }
    return args.member.user
      .kick()
      .then(msg())
      .catch(e => new Error('Failed to kick user', e));
  }
}

module.exports = kickCommand;
