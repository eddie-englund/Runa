const Guild = require('../models/guild');

function log(message, embed) {
    Guild.findOne(
        {
            guildID: message.guild.id
        },
        (err, res) => {
            const modlog = message.guild.channels
                .filter(c => c.type === 'text')
                .find(x => x.name === res.guildLog);
            // eslint-disable-next-line no-new
            if (err) new Error('Error in log.js line 8', err);
            switch (res.guildRulesActive) {
            case true:
                message.util.send(embed);
                if (!modlog) return undefined;
                modlog.send(embed);
                break;
            case false:
                message.util.send(embed);
                break;
            default:
                message.util.send(embed);
                if (!modlog) return undefined;
                modlog.send(embed);
            }
            return undefined;
        }
    );
}

module.exports = log;
