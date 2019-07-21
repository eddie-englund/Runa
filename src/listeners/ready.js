/* eslint-disable no-console */
const { Listener } = require('discord-akairo');
const { connect } = require('mongoose');
const logger = require('../util/winston');

class ReadyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        await connect(
            'mongodb://localhost:27017/Runa',
            {
                useNewUrlParser: true
            },
            err => logger.info('Connected to db. Error: ', err)
        );

        this.client.user.setActivity('!help', { type: 'LISTENING' });

        logger.info('Runa bot has connected');
    }
}

module.exports = ReadyEvent;
