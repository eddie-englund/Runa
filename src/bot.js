const {
    AkairoClient
} = require('discord-akairo');
const {
    config
} = require('dotenv');
config();
const client = new AkairoClient({
    ownerID: process.env.ownerID,
    prefix: '!',
    emitters: {
        process
    },
    blockBots: true,
    defaultCooldown: 2500,
    allowMention: false,
    commandDirectory: './commands/',
    listenerDirectory: './events/'
}, {
    disableEveryone: true
});

client.login(process.env.TOKEN);