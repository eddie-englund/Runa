const Guild = require('../models/guild');

function msg(message, embed, embedTwo) {
    const bed = () => {
        if (!embedTwo) {
            message.util.send(embed);
        } else {
            message.util.send(embedTwo);
        }
    };

    Guild.findOne(
        {
            guildID: message.guild.id
        },
        (err, res) => {
            let logChannel = res.guildLog;
            if (!res) {
                logChannel = 'modlogs';
            }

            const modlog = message.guild.channels
                .filter(c => c.type === 'text')
                .find(x => x.name === logChannel);
            // eslint-disable-next-line no-new
            if (err) new Error('Error in log.js line 8', err);
            switch (res.guildRulesActive) {
            case true:
                bed();
                if (!modlog) return undefined;
                modlog.send(embed);
                break;
            case false:
                bed();
                break;
            default:
                bed();
                if (!modlog) return undefined;
                modlog.send(embed);
            }
            return undefined;
        }
    );
}

module.exports = msg;
