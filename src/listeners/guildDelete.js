const { Listener } = require('discord-akairo');

const ms = require('ms');

const User = require('../models/user');

class GuildDelete extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  exec(guild) {
    if (guild.avalible === false) return;

    setTimeout(function() {
      if (!this.client.guilds.find(x => x.id === guild.id)) {
        return User.collection.deleteMany(
          {
            guildID: guild.id
          },
          err =>
            new Error(
              `Failed to delete all guild members when bot left guild: ${
                guild.name
              } guildID: ${guild.id}`,
              err
            )
        );
      }
    }, ms('2 days'));
    return console.log(`Left guild: ${guild.name}, guildID: ${guild.id}`);
  }
}

module.exports = GuildDelete;
