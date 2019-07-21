const { Schema, model } = require('mongoose');

const BanSchema = new Schema({
    userID: String,
    username: String,
    date: String
});

const GuildSchema = new Schema({
    guildID: String,
    guildOwner: String,
    guildOwnerID: String,
    guildRules: String,
    guildRulesUser: String,
    guildRulesUserID: String,
    guildLog: String,
    bans: Number,
    guildBans: [BanSchema],
    date: String
});

const Guild = model('guild', GuildSchema);

module.exports = Guild;
