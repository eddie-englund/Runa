const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { config } = require('dotenv');
const { join } = require('path');

// Dotenv config
config();

// Runa Client
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
            prefix: async msg => {
                const setting = await client.getGuild(msg.guild);
                return setting.prefix;
            },
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
// Util
client.mongoose = require('./util/mongoose');
client.color = require('./util/colors.js');
client.log = require('./util/log');
client.msg = require('./util/msg');
client.logger = require('./util/winston');
client.config = require('./util/config');
client.index = require('./models/index');
require('./util/functions')(client);

// Final steps
client.mongoose.init();
client.login(process.env.TOKEN);
