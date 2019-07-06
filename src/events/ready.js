const {
    Listener
} = require('discord-akairo');
const {
    connect
} = require('mongoose');

class readyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    async exec() {
        await connect('mongodb://localhost:27017/Yamete', {
            useNewUrlParser: true
        });
        console.log('Runa bot is ready');
    }
}

module.exports = readyEvent;