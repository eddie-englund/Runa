function Log(message, embed) {
  if (!message || !embed)
    return new Error('You need to feed the function the correct args');

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

module.exports = Log;
