const { Listener } = require('discord-akairo');

class CommandBlocked extends Listener {
  constructor() {
    super('Command Blocked', {
      emitter: 'commandHandler',
      eventName: 'commandBlocked'
    });
  }

  exec(message, command, reason) {
    console.log(
      `user ${
        message.author
      } was blocked from using ${command} because of ${reson}`
    );
    return message.reply(
      `You can\'t do the ${command} command becaues of ${reason}`
    );
  }
}

module.exports = CommandBlocked;
