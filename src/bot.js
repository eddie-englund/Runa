const { AkairoClient } = require('discord-akairo');
const { config } = require('dotenv');
const { join } = require('path');
config();
const client = new AkairoClient(
  {
    ownerID: 188349686489415680,
    prefix: '!',
    emitters: {
      process
    },
    blockBots: true,
    defaultCooldown: 2500,
    allowMention: false,
    commandDirectory: join(__dirname, 'commands'),
    listenerDirectory: join(__dirname, 'events')
  },
  {
    disableEveryone: true
  }
);
console.log('b4');
client.on('debug', info => {
  console.log('got here');
  console.log(info);
});
client.login(process.env.TOKEN).then(x => console.log(x, 'owo'));
