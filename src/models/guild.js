const { Schema, model } = require('mongoose');
const { defaultSettings: defaults } = require('../util/config');

const BanSchema = new Schema({
    userID: String,
    username: String,
    date: String
});

const GuildSchema = new Schema({
    guildID: String,
    guildName: String,
    prefix: {
        type: String,
        default: defaults.prefix
    },
    bans: [BanSchema],
    guildLogActive: {
        type: Boolean,
        default: true
    },
    guildLog: {
        type: String,
        default: defaults.log
    },
    guildRules: {
        type: String,
        default: ''
    }
});

const Guild = model('guild', GuildSchema);

module.exports = Guild;
