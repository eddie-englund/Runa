const { AkairoClient } = require('discord-akairo');
const { config } = require('dotenv');
const { join } = require('path');
config();
const client = new AkairoClient(
  {
    ownerID: process.env.ownerID,
    prefix: '!',
    emitters: {
      process
    },
    blockBots: true,
    defaultCooldown: 2500,
    allowMention: true,
    handleEdits: true,
    commandDirectory: join(__dirname, 'commands'),
    listenerDirectory: join(__dirname, 'events')
  },
  {
    disableEveryone: true
  }
);

client.login(process.env.TOKEN);
