const mongoose = require('mongoose');
const logger = require('./winston');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        mongoose.connect('mongodb://localhost:27017/Runa', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            logger.info({ event: 'Connected to db successfully' });
        });

        mongoose.connection.on('err', err => {
            logger.error({ event: 'error' }, 'Mongoose connection error', `Error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            logger.info({ event: 'db disconnected' }, 'Mongoose has disconnected from db');
        });
    }
};
