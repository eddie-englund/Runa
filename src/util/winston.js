const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
        // New winston.transports.File({ filename: 'error.log', level: 'error', date: Date() }),
        // new winston.transports.File({ filename: 'combined.log', date: Date() })
    ]
});

module.exports = logger;
