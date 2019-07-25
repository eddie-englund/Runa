module.exports = client => {
    const today = new Date();
    client.rulesEmbed = async message => {
        const res = await client.getGuild(message.guild);
        const embed = client.util
            .embed()
            .setColor(client.color.blue)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('Guild rules')
            .setDescription(res.guildRules)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp(today);
        if (res) return embed;
        else return 'something went wrong';
    };

    client.newRulesEmbed = async message => {
        const embed = await client.util
            .embed()
            .setColor(client.color.blue)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription('A admin has set new rules! Check them out with the rules command')
            .addField('**User**:', message.author.username, true)
            .addField('**UserID**: ', message.author.id, true)
            .setTimestamp(today);
        if (embed) return embed;
        else return 'ERROR';
    };
};
