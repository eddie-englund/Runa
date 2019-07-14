const { Listener } = require("discord-akairo");
const { connect } = require("mongoose");

class ReadyEvent extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      eventName: "ready"
    });
  }

  async exec() {
    await connect(
      "mongodb://localhost:27017/Runa",
      {
        useNewUrlParser: true
      },
      err => console.log("Failed to connect to db", err)
    );
    console.log("Runa bot is ready");
  }
}

module.exports = ReadyEvent;
