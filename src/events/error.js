const { Listener } = require('discord-akairo');

class ErrorEventListener extends Listener {
  constructor() {
    super('Error', {
      eventName: 'error',
      emitter: 'client'
    });
  }

  exec(e) {
    console.log('ERROR V', e);
  }
}
