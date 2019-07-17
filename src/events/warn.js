const { Listener } = require('discord-akairo');

class WarnEventListener extends Listener {
  constructor() {
    super('warn listener', {
      eventName: 'warn',
      emitter: 'client'
    });
  }
  exec(e) {
    console.log('Warning: ', e);
  }
}

module.exports = WarnEventListener;
