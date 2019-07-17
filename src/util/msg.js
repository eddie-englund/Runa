function msg(message, embed, embedTwo) {
  if (!embedTwo) {
    message.channel.send(embed);
  } else {
    message.channel.send(embedTwo);
  }

  const modLogs = message.guild.channels
    .filter(c => c.type === 'text')
    .find(x => x.name === 'modlogs');
  const logs = message.guild.channels
    .filter(c => c.type === 'text')
    .find(x => x.name === 'logs');

  if (modLogs) {
    return modLogs.send(embed);
  } else if (logs) {
    return logs.send(embed);
  } else {
    return;
  }
}

module.exports = msg;
