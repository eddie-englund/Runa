const {
    Listener
} = require('discord-akairo');

const ms = require('ms');

const User = require('../models/user');


class guildDelete extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            eventName: 'guildDelete'
        });
    }

    exec(guild) {
        if (!guild.avalible) return;
        let newToday = new Date();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        newToday = mm + '/' + dd + '/' + yyyy;

        setTimeout(function () {
            if (!this.client.guilds.find(x => x.id === guild.id)) {
                return User.collection.deleteMany({
                    guildID: guild.id
                }, (err => new Error(`Failed to delete all guild members when bot left guild: ${guild.name} guildID: ${guild.id}`, err)));
            }
        }, ms('2 days'))
        return console.log(`Left guild: ${guild.name}, guildID: ${guild.id}`);
    }
}

module.exports = guildDelete;