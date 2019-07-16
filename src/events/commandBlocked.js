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
      `${message.author.username} was blocked from using ${
        command.id
      } because of ${reason}!`
    );
    if (message.type === 'dm') return;
    return message
      .reply(
        `You've been blocked from using this command. error message: ${reason}`
      )
      .then(msg => msg.delete(5000));
  }
}

module.exports = CommandBlocked;
