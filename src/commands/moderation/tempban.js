const { Command } = require('discord-akairo');
const { main } = require('../../../colors.json');
const Msg = require('../../util/msg');
const ms = require('ms');

class TemporaryBanCommand extends Command {
  constructor() {
    super('tempban', {
      aliases: ['tempban', 'temporaryban', 'temphammer'],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      category: 'moderation',
      description: {
        content: 'Temporarily bans a user',
        usage: ['<@user> <time> <reason>']
      },
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'time'
        },
        {
          id: 'reason',
          match: 'rest',
          default: 'No reason given'
        }
      ]
    });
  }
  exec(message, args) {}
}

module.exports = TemporaryBanCommand;
