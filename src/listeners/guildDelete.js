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
        const today = new Date();
        if (guild.avalible === false) return;
        const Guilds = this.client.guilds;
        // eslint-disable-next-line func-names
        setTimeout(() => {
            if (!Guilds.find(x => x.id === guild.id)) {
                return User.collection.deleteMany(
                    {
                        guildID: guild.id
                    },
                    err =>
                        new Error(
                            `Failed to delete all guild members when bot left guild: ${guild.name} guildID: ${guild.id}`,
                            err
                        )
                );
            }
            return undefined;
        }, ms('2 days'));
        // eslint-disable-next-line no-console, consistent-return
        return this.client.logger.info(
            { event: 'guildDelete' },
            `Left guild: ${guild.name}, guildID: ${guild.id} at ${today}`
        );
    }
}

module.exports = GuildDelete;
