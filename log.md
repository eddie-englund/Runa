## Log

### 03:11 06/06/2019

just launched the project (again because I'm retarded)

Created:

- .env for secret data
- File structure
- MongoDB model (User(guild specific))
- Ready event
- .gitignore (git)

Began with:

- Warn command

Notes for next time:
Complete the warn command. Test it and make sure db is working correctly.

### 14:03 06/07/2019

Finished the Warn command and fixed db model issues.

### 22:59 06/07/2019

Found bug in warn command. It does not kick the user after three warnings.

I belive all issues are fixed.

added:

- bot/help
- moderation/clear
- moderation/ban
- events/commandBlocked

### 08:16 08/07/2019

Added:

- guildRemove

The guildRemove event will drop all guild related instances/documents a day after the bot left he guild.

### 11:03 10/07/2019

Added:

- message event
- kick command
- removed log command

### 22:04 16/072019

Added:

- set rules command
- rules command
- Temp mute command
- Perms event
- More events
- unban command
- Util

Fixed:

- bug causing the bot to be unable to boot
- loadash security issue (fixed by updating to a newer version)

Notes:

- I seem to have missed to log a few things. I've added a few event listeners.

### 13:15 17/07/2019

**MAJOR OVERHAUL TO AKAIRO MASTER**

Added:

- MissingPerms event

Changed a lot of code to work with discord.js@master and discord-akairo@master (there might still be bugs)

"missed date"

Added:

- log command and updated util
- pardon commad
- bans command
