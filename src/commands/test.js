const { Command } = require('discord-akairo');
const msg = require('../util/log.js');

class TestCommand extends Command {
  constructor() {
    super('test', {
      aliases: ['test']
    });
  }
  exec(message) {
    const embed = this.client.util
      .embed()
      .setColor('#c7c7')
      .setDescription('Test log');
    msg(message, embed);
  }
}

module.exports = TestCommand;
