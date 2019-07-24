const { Listener } = require('discord-akairo');

class GuildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        try {
            const newGuild = {
                guildID: guild.id,
                guildName: guild.name
            };
            await this.client.createGuild(newGuild);
        } catch (error) {
            this.client.logger.error(
                { event: 'error' },
                `Error message: ${error.message}`,
                `Error: ${error}`
            );
        }
    }
}

module.exports = GuildCreate;
