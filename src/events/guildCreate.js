const {
    Listener
} = require('discord-akairo');

const {
    main
} = require('../../colors.json');

class guildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            eventName: 'guildCreate'
        });
    }

    exec(guild) {
        const home = guild.channels.filter(c => c.type === 'text').find(x => x.name === 'general');
        if (!home) return console.log('No general chat in this guild');
        home.send('Hi! I\'m runa and and I am a moderation bot! To read more about me go to my website: or write !help');
    }
}

module.exports = guildCreate;