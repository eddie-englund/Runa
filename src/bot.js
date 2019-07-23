const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { config } = require('dotenv');
const { join } = require('path');

config();
class RunaClient extends AkairoClient {
    constructor() {
        super(
            {
                ownerID: process.env.ownerID
            },
            {
                disableEveryone: true
            }
        );

        this.commandHandler = new CommandHandler(this, {
            prefix: '!',
            blockBots: true,
            blockClient: true,
            allowMention: true,
            commandUtil: true,
            cooldown: 2000,
            handleEdits: true,
            directory: join(__dirname, 'commands')
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, 'listeners')
        });
        this.commandHandler.useListenerHandler(this.ListenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
}
const client = new RunaClient();
client.color = require('./util/colors.js');
client.log = require('./util/log');
client.msg = require('./util/msg');
client.logger = require('./util/winston');
client.login(process.env.TOKEN);
