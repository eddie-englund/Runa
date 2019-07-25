module.exports = {
    owner: process.env.OWNER,
    prefix: '!',
    defaultSettings: {
        prefix: '!',
        log: 'modlog',
        user: {
            username: String,
            userID: String,
            usertag: String,
            warnings: Number
        }
    }
};
