const { Listener } = require("discord-akairo");

class messageListener extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      eventName: "message"
    });
  }

  exec(message) {
    const prefix = this.handler.message.prefix(message);
    if (!message.content.startsWith(prefix)) return;
  }
}

module.exports = messageListener;
