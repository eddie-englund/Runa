const Guild = require('../models/guild');

function log(message, embed) {
    Guild.findOne(
        {
            guildID: message.guild.id
        },
        (err, res) => {
            // eslint-disable-next-line no-new
            if (err) new Error('Error in log.js line 8', err);
            if (!res || !res.guildLog || res.guildLog.length < 1) {
                const defaultLog = message.guild.channels
                    .filter(c => c.type === 'text')
                    .find('modlogs');
                if (!defaultLog) return;
                defaultLog.send(embed);
            } else {
                // eslint-disable-next-line no-shadow
                const log = res.guildLog;
                const logChannel = message.guild.channels
                    .filter(c => c.type === 'text')
                    .find(x => x.name === log);
                if (!logChannel) {
                    message
                        .reply(
                            'Error! Can\'t find log channel. Please contact a moderator or admin'
                        )
                        // eslint-disable-next-line no-shadow
                        .then(msg => msg.delete(10000));
                } else {
                    logChannel.send(embed);
                }
            }
        }
    );
}

module.exports = log;
