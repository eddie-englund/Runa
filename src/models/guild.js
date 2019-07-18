const { Schema, model } = require('mongoose');

const GuildSchema = new Schema({
    guildID: String,
    guildOwner: String,
    guildOwnerID: String,
    guildRules: String,
    guildRulesUser: String,
    guildRulesUserID: String,
    guildLog: String,
    date: String
});

const Guild = model('guild', GuildSchema);

module.exports = Guild;
