// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Owner-san", "Meddling Mods", "Mods", "Admin", "Moderators", "Protector of the Apples"].includes(r.name)) )
      return message.reply("Bitch! You ain't got enough powah to do that shit!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("Can't kick someone higher than me. Nice try though.");

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You gotta tell me why you're banning the user. Rewrite your command and put the reason next to it - We'll send that bitch flyin!");

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Owner-san", "Owner", "Admin"].includes(r.name)) )
      return message.reply("You can't slam that ban hammer on ass if you don't have the power!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("Lol, I can't ban that user - He's higher than me in the food chain. If I do it, I'm screwed!");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You gotta indicate why you be banning this hoe.");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Pick a number between 1-100 and the deed shall be done!");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);
client.on('message', message => {
  var prefix = "+"
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'hello')) {
		  message.reply('Hey there!');
	} else

  if (message.content.startsWith(prefix + 'Hello')) {
		  message.reply('Hey there!');
  } else

  if (message.content.startsWith(prefix + 'hey')) {
		  message.reply('Wassap?');
  } else

  if (message.content.startsWith(prefix + 'Hey')) {
      message.reply('Wassap?');
  } else

  if (message.content.startsWith(prefix + 'Hi')) {
      message.reply('Heyy!');
  } else

  if (message.content.startsWith(prefix + 'hi')) {
      message.reply('Heyy!');
  } else

  if (message.content.startsWith(prefix + 'kys')) {
      message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'KYS')) {
        message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'Kill urself')) {
        message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'Kill yourself')) {
        message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'kill yourself')) {
        message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'kill urslf')) {
        message.reply(`How about you do it first, seeing as how useless and irrelevant you are.`);
  } else

    if (message.content.startsWith(prefix + 'yato')) {
        message.reply(`Yup?`);
  } else

    if (message.content.startsWith(prefix + 'Yato')) {
          message.reply(`Thats mah name!`);
  } else

    if (message.content.startsWith(prefix + 'YATO')) {
       message.reply(`YES??`);
  } else
	  
   if (message.content.startsWith(prefix + 'creator')) {
        message.reply(`I was created by @Lee Min Ho#9443 - He has many names: Yato, NinjaBot, etc. The man is a born legend.  `);
  } else

    if (message.content.startsWith(prefix + 'wot')) {
        message.reply(`I ask myself that everyday...`);
  } else

    if (message.content.startsWith(prefix + 'WOT')) {
        message.reply(`It's 'what' you retard.`);
  } else

    if (message.content.startsWith(prefix + 'Say my name')) {
        message.reply(`spanx me`);
  } else

    if (message.content.startsWith(prefix + 'say mah name')) {
       message.reply(`daddy pls no`);
  } else

    if (message.content.startsWith(prefix + 'say my name')) {
        message.reply(`<--`);
  } else

    if (message.content.startsWith(prefix + 'how r u')) {
        message.reply(`Terrible.`);
  } else

    if (message.content.startsWith(prefix + 'hru')) {
        message.reply(`fine`);
  } else

    if (message.content.startsWith(prefix + 'how are you')) {
        message.reply(`I'm great - in many, many ways...`);
  } else

    if (message.content.startsWith(prefix + 'How are you')) {
        message.reply(`Great now that you're here, now lemme smesh.`);
  } else

    if (message.content.startsWith(prefix + 'help')) {
       message.reply(`Figure it out yourself. `);
  } else

    if (message.content.startsWith(prefix + 'Help')) {
        message.reply(`Deal with your own problems man.`);
  } else

    if (message.content.startsWith(prefix + 'good')) {
        message.reply(`Ok.`);
  } else

    if (message.content.startsWith(prefix + 'Great')) {
        message.reply('Lies.');
  } else

    if (message.content.startsWith(prefix + 'bad')) {
        message.reply('Well that is your problem...');
  } else

    if (message.content.startsWith(prefix + 'terrible')) {
        message.reply('That makes me feel happy');
  } else

    if (message.content.startsWith(prefix + 'Bad')) {
        message.reply('Ugh..You should say something better.');
  } else
	  
  
    if (message.content.startsWith(prefix + 'lol')) {
        message.reply('How do you expect me to reply to that? Immma bot, not an actual human.' );
  } else

    if (message.content.startsWith(prefix + 'fanfiction')) {
        message.reply(`What? You expect me to write one?`);
  } else

    if (message.content.startsWith(prefix + 'yes')) {
        message.reply(`kys`);
  } else

    if (message.content.startsWith(prefix + 'YES')) {
        message.reply(`NO!`);
  } else

    if (message.content.startsWith(prefix + 'Yes')) {
        message.reply(`NO!`);
  } else

    if (message.content.startsWith(prefix + 'No')) {
        message.reply(`Ok.`);
  } else

    if (message.content.startsWith(prefix + 'NO')) {
        message.reply(`OK!`);
  } else

    if (message.content.startsWith(prefix + 'no')) {
        message.reply(`Alright then.`);
  } else

    if (message.content.startsWith(prefix + 'bye')) {
        message.reply(`!Adios!`);
  } else

    if (message.content.startsWith(prefix + 'Bye')) {
       message.reply(`So happy you're going!`);
  } else

    if (message.content.startsWith(prefix + 'BYE')) {
        message.reply(`NOBODY CARES!`);
  } else

    if (message.content.startsWith(prefix + 'buh bye')) {
        message.reply(`oh kay`);
  } else

    if (message.content.startsWith(prefix + 'bye bye')) {
        message.reply(`See ya!`);
  } else

    if (message.content.startsWith(prefix + 'Good day!')) {
        message.reply(`A good day to you too sir!`);
  } else

    if (message.content.startsWith(prefix + 'good day')) {
        message.reply(`No, bad day - I'm on my period`);
  } else

    if (message.content.startsWith(prefix + 'gday')) {
        message.reply(`You could at least spell it out you lazy asshole.`);
  } else

    if (message.content.startsWith(prefix + 'goodday')) {
        message.reply('A fine day it is, dear sir!');
  } else

      if (message.content.startsWith(prefix + 'Good Day')) {
          message.reply('Indeed it is!');
  } else

       if (message.content.startsWith(prefix + 'gnight')) {
           message.reply('You could at least spell it out you lazy asshole.');
  } else

       if (message.content.startsWith(prefix + 'good night')) {
           message.reply('Good Night!');
  } else

       if (message.content.startsWith(prefix + 'Good Night')) {
           message.reply('Bye.');
  } else

        if (message.content.startsWith(prefix + 'good afternoon')) {
            message.reply(`Terrible Afternoon.`);
  } else

        if (message.content.startsWith(prefix + 'Good Afternoon')) {
            message.reply(`It's night where I am...`);
  } else

        if (message.content.startsWith(prefix + 'where are you')) {
            message.reply(`~~In your mama's ass~~`);
  } else

        if (message.content.startsWith(prefix + 'Where are you')) {
            message.reply(`Iceland.`);
    } else

        if (message.content.startsWith(prefix + 'where r u')) {
            message.reply(`In your bed. Waiting.`);
    } else

        if (message.content.startsWith(prefix + 'die')) {
            message.reply(`You should do that first.`);
    } else

        if (message.content.startsWith(prefix + 'Die')) {
            message.reply(`Want noods first?`);
    } else

        if (message.content.startsWith(prefix + 'send nudes')) {
            message.reply(`No.`);
    } else

        if (message.content.startsWith(prefix + 'send noods')) {
            message.reply(`nah, too tired.`);
    } else

        if (message.content.startsWith(prefix + 'Send Nudes')) {
            message.reply(`How about no?`);
    } else

        if (message.content.startsWith(prefix + 'Send noods')) {
            message.reply(`no.`);
    } else

        if (message.content.startsWith(prefix + 'Send nudes')) {
            message.reply(`spanx me first`);
    } else

        if (message.content.startsWith(prefix + 'Best bot')) {
           message.reply(`I am, aren't I?`);
    } else

        if (message.content.startsWith(prefix + 'ur a shitty bot')) {
            message.reply(`You're a shitty person.`);
          } else

            if (message.content.startsWith(prefix + 'fuck you')) {
                message.reply('You wish you could.');
          } else

            if (message.content.startsWith(prefix + 'Fock you')) {
                message.reply('Try to do it, bitch.' );
          } else

            if (message.content.startsWith(prefix + 'Fuck u')) {
                message.reply(`Angry?`);
          } else

            if (message.content.startsWith(prefix + 'fu')) {
                message.reply(`You wish.`);
          } else

            if (message.content.startsWith(prefix + 'FUCK YOU')) {
                message.reply(`Try me bitch!`);
          } else

            if (message.content.startsWith(prefix + 'FOCK YOU')) {
                message.reply(`lol`);
          } else

            if (message.content.startsWith(prefix + 'FU')) {
                message.reply(`Ok.`);
          } else

            if (message.content.startsWith(prefix + 'Your lame' )) {
                message.reply(`Look whose talking.`);
          } else

            if (message.content.startsWith(prefix + 'I hate you')) {
                message.reply(`So do I.`);
          } else

            if (message.content.startsWith(prefix + 'I love you')) {
                message.reply(`I don't.`);
          } else

            if (message.content.startsWith(prefix + 'i love you')) {
               message.reply(`I love me too.`);
          } else

            if (message.content.startsWith(prefix + 'kiss me')) {
                message.reply(`no.`);
          } else

            if (message.content.startsWith(prefix + 'Kiss me')) {
                message.reply(`NO!`);
          } else

            if (message.content.startsWith(prefix + 'shut up')) {
                message.reply(`Nah.`);
          } else

            if (message.content.startsWith(prefix + 'marry me')) {
                message.reply(`Sorry, whores are not on my bucket list.`);
          } else

            if (message.content.startsWith(prefix + 'kill me')) {
                message.reply(`Gladly.`);
          } else

            if (message.content.startsWith(prefix + 'smh')) {
                message.reply(`Ok.`);
          } else

            if (message.content.startsWith(prefix + 'ur an asshole')) {
                message.reply('Thanks!');
          } else

              if (message.content.startsWith(prefix + 'shit')) {
                  message.reply('Indeed.');
          } else

               if (message.content.startsWith(prefix + 'back me up')) {
                   message.reply('All right mah nigga.');
          } else

               if (message.content.startsWith(prefix + 'minecraft')) {
                   message.reply('DONT SAY THOSE WORDS IN FRONT OF ME' );
          } else

               if (message.content.startsWith(prefix + 'MINECRAFT')) {
                   message.reply('NEEEIIINN');
          } else

                if (message.content.startsWith(prefix + 'roblox')) {
                    message.reply(`kys`);
          } else

                if (message.content.startsWith(prefix + 'ROBLOX')) {
                    message.reply(`fffffffffffffffffff`);
          } else

                if (message.content.startsWith(prefix + 'u kys')) {
                    message.reply(`You do it first.`);
          } else

                if (message.content.startsWith(prefix + 'Nein')) {
                    message.reply(`Dein fuhrer is disappointed`);
            } else

                if (message.content.startsWith(prefix + 'hola')) {
                    message.reply(`hola, puta`);
            } else

                if (message.content.startsWith(prefix + 'Hola')) {
                    message.reply(`Adios.`);
            } else

                if (message.content.startsWith(prefix + 'Adios')) {
                    message.reply(`Bye.`);
            } else

                if (message.content.startsWith(prefix + 'adios')) {
                    message.reply(`nobody cares about you`);
            } else

                if (message.content.startsWith(prefix + ':(')) {
                    message.reply(`I don't care.`);
            } else

                if (message.content.startsWith(prefix + 'ily')) {
                    message.reply(`I love me too.`);
            } else

                if (message.content.startsWith(prefix + 'ihy')) {
                    message.reply(`I don't care about you.`);
            } else

                if (message.content.startsWith(prefix + 'fuck')) {
                    message.reply(`no daddy pls`);
            } else

                if (message.content.startsWith(prefix + 'FUCK')) {
                   message.reply(`pls no daddy`);
            } else

                if (message.content.startsWith(prefix + 'uckers')) {
                    message.reply(`mans not hot`);
						} else

								 if (message.content.startsWith(prefix + 'ur mom')) {
								     message.reply(`She's dead`);
						 } else

								 if (message.content.startsWith(prefix + 'ur dad')) {
								     message.reply(`He is the fisting god.`);
						 } else

								 if (message.content.startsWith(prefix + 'lmao')) {
								     message.reply(`Same hewe`);
					  } else

								 if (message.content.startsWith(prefix + 'anything')) {
								     message.reply(`Anything? What the hell am I supposed to do there?`);
									 } else

									 	if (message.content.startsWith(prefix + 'suck a dick')) {
									 		 message.reply(`Does this mean I have to suck you, since you know - YOUR A DICK!?!?`);
									 } else

									 	if (message.content.startsWith(prefix + 'added')) {
									 			message.reply(`ok`);
									 } else

									 	if (message.content.startsWith(prefix + 'ok')) {
									 			message.reply(`oh kay`);
									 } else

									 	if (message.content.startsWith(prefix + 'Ok')) {
									 			message.reply(`Alright.`);
									 } else

									 	if (message.content.startsWith(prefix + 'cunt')) {
									 			message.reply(`Such vulgar language....`);
									 } else

									 	if (message.content.startsWith(prefix + 'lemme smesh')) {
									 			message.reply(`*smashes*`);
									 } else

									 	if (message.content.startsWith(prefix + 'hii')) {
									 			message.reply(`lemme smesh`);
									 } else

									 	if (message.content.startsWith(prefix + 'whats up')) {
											 	message.reply(`nun much`);
								   } else

									  if (message.content.startsWith(prefix + 'suck my hairy dick')) {
											  message.reply(`After I eat lunch.`);
									 } else

 										if (message.content.startsWith(prefix + 'suck my hairy balls')) {
 												message.reply(`Does it come with salad?`);
									 } else

			 							if (message.content.startsWith(prefix + 'suck my balls')) {
			 									message.reply(`After I eat lunch.`);
									 } else

	 			 						if (message.content.startsWith(prefix + 'right')) {
	 			 								message.reply('Yes! 100%');
											} else

										    if (message.content.startsWith(prefix + 'rape me')) {
										        message.reply(`No, bad day - I'm on my period`);
										  } else

										    if (message.content.startsWith(prefix + 'cmon')) {
										        message.reply(`You could at least spell it out you lazy asshole.`);
										  } else

										    if (message.content.startsWith(prefix + 'spank me daddy')) {
										        message.reply('*takes out belt*');
										  } else

										      if (message.content.startsWith(prefix + 'who lives in a pineapple under the sea')) {
										          message.reply('SPONGEBOB SQUAREPANTS');
										  } else

										       if (message.content.startsWith(prefix + 'loli')) {
										           message.reply('Yassu~Lolis are besto.');
										  } else

										       if (message.content.startsWith(prefix + 'bitch')) {
										           message.reply('*nothing is done*');
										  } else

										       if (message.content.startsWith(prefix + 'bitch slap')) {
										           message.reply('Commencing the slapping of thy bitches.');
										  } else

										        if (message.content.startsWith(prefix + 'uwu')) {
										            message.reply(`Speak English.`);
										  } else

										        if (message.content.startsWith(prefix + 'why')) {
										            message.reply('Idk man, stop asking me weird shit.');
										  } else

										        if (message.content.startsWith(prefix + 'lolis suck')) {
										            message.reply(`TAKE IT BACK!!`);
										  } else

										        if (message.content.startsWith(prefix + 'creampie')) {
										            message.reply(`pervert`);
										    } else

										        if (message.content.startsWith(prefix + 'dice')) {
										            message.reply(`Don't have any...`);
										    } else

										        if (message.content.startsWith(prefix + 'ship')) {
										            message.reply(`I ship nobody and nobody ships me :(`);
												} else

														if (message.content.startsWith(prefix + 'yay')) {
																message.reply(`ok?`);
												} else

														if (message.content.startsWith(prefix + 'your useless')) {
																message.reply(`So are you, but nobody tells you that do they?`);
												} else

														if (message.content.startsWith(prefix + 'ur useless')) {
															  message.reply(`I'd say just like you sense of humor, but it isnt useless, it makes people kill themselves.`);
												} else

														if (message.content.startsWith(prefix + 'shaddap')) {
																message.reply(`MAKE ME!`);
												} else

														if (message.content.startsWith(prefix + '*shuts up*')) {
																message.reply(`...`);
															} else

														       if (message.content.startsWith(prefix + 'xtein')) {
														           message.reply('Xtein? Futanari.');
														  } else

														       if (message.content.startsWith(prefix + 'futanari')) {
														           message.reply('I see you are a man of culture as well.');
														  } else

														        if (message.content.startsWith(prefix + 'futa')) {
														            message.reply(`I see you are a man of culture as well.`);
														  } else

														        if (message.content.startsWith(prefix + 'bdsm')) {
														            message.reply(`Spank me....`);
														  } else

														        if (message.content.startsWith(prefix + 'where do you live')) {
														            message.reply(`~~In your mama's ass~~`);
  }
});
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(PREFIX.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === `volume`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === `np`) {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === `queue`) {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === `resume`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

client.login(config.token);
client.login(process.env.BOT_TOKEN);
