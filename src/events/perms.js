const { Listener } = require('discord-akairo');

class ClientMissingPermissionsListener extends Listener {
  constructor() {
    super('Missing Perms', {
      emitter: 'commandHandler',
      eventName: 'missingPermissions'
    });
  }
  exec(message) {
    message.reply(
      'Seems like I am missing permissions! Please, check with a guild moderator/admin.'
    );
  }
}

module.exports = ClientMissingPermissionsListener;
