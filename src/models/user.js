const { model, Schema } = require('mongoose');

const WarnerSchema = Schema({
    userID: String,
    username: String,
    date: String
});

const ReporterSchema = Schema({
    userID: String,
    username: String,
    date: String
});

const UserSchema = Schema({
    userID: String,
    username: String,
    guildID: String,
    warnings: Number,
    warners: [
        WarnerSchema
    ],
    warnDate: Array,
    reports: Number,
    reporters:[
        ReporterSchema
    ],
    reportDate: Array,
    createdAt: String
});

const User = model('User', UserSchema);
module.exports = User;