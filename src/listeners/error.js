const { Listener } = require('discord-akairo');

class ErrorEventListener extends Listener {
  constructor() {
    super('Error', {
      event: 'error',
      emitter: 'client'
    });
  }

  exec(e, message) {
    message.reply('Waow');
    console.log(e);
  }
}

module.exports = ErrorEventListener;
