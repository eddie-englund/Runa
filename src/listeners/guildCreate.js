const { Listener } = require('discord-akairo');

class GuildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    exec(guild) {
        const home = guild.channels
            .filter(c => c.type === 'text')
            .find(x => x.name === 'general');
        if (!home) {
            // eslint-disable-next-line no-console
            return console.log(`No general chat found in guild ${guild.name}`);
        }
        return home.send(
            'Hi! I\'m Runa and and I am a moderation bot! To read more about me go to my website: or write !help'
        );
    }
}

module.exports = GuildCreate;
