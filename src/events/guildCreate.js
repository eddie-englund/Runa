const { Listener } = require("discord-akairo");

class GuildCreate extends Listener {
  constructor() {
    super("guildCreate", {
      emitter: "client",
      eventName: "guildCreate"
    });
  }

  exec(guild) {
    const home = guild.channels
      .filter(c => c.type === "text")
      .find(x => x.name === "general");
    if (!home)
      return console.log(`No general chat found in guild ${guild.name}`);
    home.send(
      "Hi! I'm Runa and and I am a moderation bot! To read more about me go to my website: or write !help"
    );
  }
}

module.exports = GuildCreate;
