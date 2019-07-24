/* eslint-disable new-cap */
/* eslint-disable no-prototype-builtins */
const { Guild } = require('../models');
const mongoose = require('mongoose');
const logger = require('./winston');

module.exports = client => {
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }
        logger.info(
            `Guild "${data.guildName}" (${data.guildID}) updated settings: ${Object.keys(settings)}`
        );
        // eslint-disable-next-line consistent-return, no-return-await
        return await data.updateOne(settings);
    };

    client.createGuild = async settings => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save().then(g => {
            logger.info(
                {
                    event: 'guildCreate'
                }`Default settings saved for guild "${g.guildName}" (${g.guildID})`
            );
        });
    };

    client.clean = text => {
        if (typeof text === 'string') {
            return text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`);
        } else {
            return text;
        }
    };
};
