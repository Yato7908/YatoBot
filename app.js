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
    if(!message.member.roles.some(r=>["Owner-san", "Meddling Mods"].includes(r.name)) )
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
    if(!message.member.roles.some(r=>["Owner-san"].includes(r.name)) )
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

const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");

const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const dm_text = "Hey there! Use !commands on a public chat room to see the command list.";
const mention_text = "Use !commands to see the command list.";
var aliases_file_path = "aliases.json";

var stopped = false;
var inform_np = true;

var now_playing_data = {};
var queue = [];
var aliases = {};

var voice_connection = null;
var voice_handler = null;
var text_channel = null;

var yt_api_key = null;

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

var commands = [

	{
		command: "stop",
		description: "Stops playlist (will also skip current song!)",
		parameters: [],
		execute: function(message, params) {
			if(stopped) {
				message.reply("Playback is already stopped!");
			} else {
				stopped = true;
				if(voice_handler !== null) {
					voice_handler.end();
				}
				message.reply("Stopping!");
			}
		}
	},
	
	{
		command: "resume",
		description: "Resumes playlist",
		parameters: [],
		execute: function(message, params) {
			if(stopped) {
				stopped = false;
				if(!is_queue_empty()) {
					play_next_song();
				}
			} else {
				message.reply("Playback is already running");
			}
		}
	},

    {
        command: "request",
        description: "Adds the requested video to the playlist queue",
        parameters: ["video URL, video ID, playlist URL or alias"],
        execute: function (message, params) {
            if(aliases.hasOwnProperty(params[1].toLowerCase())) {
                params[1] = aliases[params[1].toLowerCase()];
            }

            var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
            var match = params[1].match(regExp);

            if (match && match[2]){
                queue_playlist(match[2], message);
            } else {
                add_to_queue(params[1], message);
            }
        }
    },

	{
		command: "search",
		description: "Searches for a video on YouTube and adds it to the queue",
		parameters: ["query"],
		execute: function(message, params) {
			if(yt_api_key === null) {
				message.reply("You need a YouTube API key in order to use the !search command. Please see https://github.com/agubelu/discord-music-bot#obtaining-a-youtube-api-key");
			} else {
				var q = "";
				for(var i = 1; i < params.length; i++) {
					q += params[i] + " ";
				}
				search_video(message, q);
			}
		}
	},

	{
		command: "np",
		description: "Displays the current song",
		parameters: [],
		execute: function(message, params) {

			var response = "Now playing: ";
			if(is_bot_playing()) {
				response += "\"" + now_playing_data["title"] + "\" (requested by " + now_playing_data["user"] + ")";
			} else {
				response += "nothing!";
			}

			message.reply(response);
		}
	},

	{
		command: "setnp",
		description: "Sets whether the bot will announce the current song or not",
		parameters: ["on/off"],
		execute: function(message, params) {

			if(params[1].toLowerCase() == "on") {
				var response = "Will announce song names in chat";
				inform_np = true;
			} else if(params[1].toLowerCase() == "off") {
				var response = "Will no longer announce song names in chat";
				inform_np = false;
			} else {
				var response = "Sorry?";
			}
			
			message.reply(response);
		}
	},

	{
		command: "commands",
		description: "Displays this message, duh!",
		parameters: [],
		execute: function(message, params) {
			var response = "Available commands:";
			
			for(var i = 0; i < commands.length; i++) {
				var c = commands[i];
				response += "\n!" + c.command;
				
				for(var j = 0; j < c.parameters.length; j++) {
					response += " <" + c.parameters[j] + ">";
				}
				
				response += ": " + c.description;
			}
			
			message.reply(response);
		}
	},

	{
		command: "skip",
		description: "Skips the current song",
		parameters: [],
		execute: function(message, params) {
			if(voice_handler !== null) {
				message.reply("Skipping...");
				voice_handler.end();
			} else {
				message.reply("There is nothing being played.");
			}
		}
	},

	{
		command: "queue",
		description: "Displays the queue",
		parameters: [],
		execute: function(message, params) {
			var response = "";
	
			if(is_queue_empty()) {
				response = "the queue is empty.";
			} else {
				var long_queue = queue.length > 30;
				for(var i = 0; i < (long_queue ? 30 : queue.length); i++) {
					response += "\"" + queue[i]["title"] + "\" (requested by " + queue[i]["user"] + ")\n";
				}

				if(long_queue) response += "\n**...and " + (queue.length - 30) + " more.**";
			}
			
			message.reply(response);
		}
	},

	{
		command: "clearqueue",
		description: "Removes all songs from the queue",
		parameters: [],
		execute: function(message, params) {
			queue = [];
			message.reply("Queue has been clered!");
		}
	},

	{
		command: "remove",
		description: "Removes a song from the queue",
		parameters: ["Request index or 'last'"],
		execute: function(message, params) {
			var index = params[1];

			if(is_queue_empty()) {
				message.reply("The queue is empty");
				return;
			} else if(isNaN(index) && index !== "last") {
				message.reply("Argument '" + index + "' is not a valid index.");
				return;
			}

			if(index === "last") { index = queue.length; }
			index = parseInt(index);
			if(index < 1 || index > queue.length) {
				message.reply("Cannot remove request #" + index + " from the queue (there are only " + queue.length + " requests currently)");
				return;
			}

			var deleted = queue.splice(index - 1, 1);
			message.reply('Request "' + deleted[0].title +'" was removed from the queue.');
		}
	},
	
	{
		command: "aliases",
		description: "Displays the stored aliases",
		parameters: [],
		execute: function(message, params) {

			var response = "Current aliases:";
			
			for(var alias in aliases) {
				if(aliases.hasOwnProperty(alias)) {
					response += "\n" + alias + " -> " + aliases[alias];
				}
			}
			
			message.reply(response);
		}
	},
	
	{
		command: "setalias",
		description: "Sets an alias, overriding the previous one if it already exists",
		parameters: ["alias", "video URL or ID"],
		execute: function(message, params) {

			var alias = params[1].toLowerCase();
			var val = params[2];
			
			aliases[alias] = val;
			fs.writeFileSync(aliases_file_path, JSON.stringify(aliases));
			
			message.reply("Alias " + alias + " -> " + val + " set successfully.");
		}
	},
	
	{
		command: "deletealias",
		description: "Deletes an existing alias",
		parameters: ["alias"],
		execute: function(message, params) {

			var alias = params[1].toLowerCase();

			if(!aliases.hasOwnProperty(alias)) {
				message.reply("Alias " + alias + " does not exist");
			} else {
				delete aliases[alias];
				fs.writeFileSync(aliases_file_path, JSON.stringify(aliases));
				message.reply("Alias \"" + alias + "\" deleted successfully.");
			}
		}
	},

	{
    command: "setusername",
		description: "Set username of bot",
		parameters: ["Username or alias"],
		execute: function (message, params) {

			var userName = params[1];
			if (aliases.hasOwnProperty(userName.toLowerCase())) {
				userName = aliases[userName.toLowerCase()];
			}

			bot.user.setUsername(userName).then(user => {
				message.reply('✔ Username set!');
			})
			.catch((err) => {
				message.reply('Error: Unable to set username');
				console.log('Error on setusername command:', err);
			});
		}
	},
  
  {
    command: "setavatar",
		description: "Set bot avatar, overriding the previous one if it already exists",
		parameters: ["Image URL or alias"],
		execute: function (message, params) {

			var url = params[1];
			if (aliases.hasOwnProperty(url.toLowerCase())) {
				url = aliases[url.toLowerCase()];
			}

			bot.user.setAvatar(url).then(user => {
				message.reply('✔ Avatar set!');
			})
			.catch((err) => {
				message.reply('Error: Unable to set avatar');
				console.log('Error on setavatar command:', err); 
      });
		}
  }

];

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("disconnect", event => {
	console.log("Disconnected: " + event.reason + " (" + event.code + ")");
});

bot.on("message", message => {
	if(message.channel.type === "dm" && message.author.id !== bot.user.id) { //Message received by DM
		//Check that the DM was not send by the bot to prevent infinite looping
		message.channel.sendMessage(dm_text);
	} else if(message.channel.type === "text" && message.channel.name === text_channel.name) { //Message received on desired text channel
		if(message.isMentioned(bot.user)) {
			message.reply(mention_text);
		} else {
			var message_text = message.content;
			if(message_text[0] == '!') { //Command issued
				handle_command(message, message_text.substring(1));
			}
		}
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function add_to_queue(video, message, mute = false) {

	if(aliases.hasOwnProperty(video.toLowerCase())) {
		video = aliases[video.toLowerCase()];
	}

	var video_id = get_video_id(video);

	ytdl.getInfo("https://www.youtube.com/watch?v=" + video_id, (error, info) => {
		if(error) {
			message.reply("The requested video (" + video_id + ") does not exist or cannot be played.");
			console.log("Error (" + video_id + "): " + error);
		} else {
			queue.push({title: info["title"], id: video_id, user: message.author.username});
			if (!mute) {
				message.reply('"' + info["title"] + '" has been added to the queue.');
			}
			if(!stopped && !is_bot_playing() && queue.length === 1) {
				play_next_song();
			}
		}
	});
}

function play_next_song() {
	if(is_queue_empty()) {
		text_channel.sendMessage("The queue is empty!");
	}

	var video_id = queue[0]["id"];
	var title = queue[0]["title"];
	var user = queue[0]["user"];

	now_playing_data["title"] = title;
	now_playing_data["user"] = user;

	if(inform_np) {
		text_channel.sendMessage('Now playing: "' + title + '" (requested by ' + user + ')');
		bot.user.setGame(title);
	}

	var audio_stream = ytdl("https://www.youtube.com/watch?v=" + video_id);
	voice_handler = voice_connection.playStream(audio_stream);

	voice_handler.once("end", reason => {
		voice_handler = null;
		bot.user.setGame();
		if(!stopped && !is_queue_empty()) {
			play_next_song();
		}
	});

	queue.splice(0,1);
}

function search_command(command_name) {
	for(var i = 0; i < commands.length; i++) {
		if(commands[i].command == command_name.toLowerCase()) {
			return commands[i];
		}
	}

	return false;
}

function handle_command(message, text) {
	var params = text.split(" ");
	var command = search_command(params[0]);

	if(command) {
		if(params.length - 1 < command.parameters.length) {
			message.reply("Insufficient parameters!");
		} else {
			command.execute(message, params);
		}
	}
}

function is_queue_empty() {
	return queue.length === 0;
}

function is_bot_playing() {
	return voice_handler !== null;
}

function search_video(message, query) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {
		var json = JSON.parse(body);
		if("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		} else if(json.items.length === 0) {
			message.reply("No videos found matching the search criteria.");
		} else {
			add_to_queue(json.items[0].id.videoId, message);
		}
	})
}

function queue_playlist(playlistId, message, pageToken = '') {
	request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
		var json = JSON.parse(body);
		if ("error" in json) {
			message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		} else if (json.items.length === 0) {
			message.reply("No videos found within playlist.");
		} else {
			for (var i = 0; i < json.items.length; i++) {
				add_to_queue(json.items[i].snippet.resourceId.videoId, message, true)
			}
			if (json.nextPageToken == null){
				return;
			}
			queue_playlist(playlistId, message, json.nextPageToken)
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function get_video_id(string) {
	var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
	var matches = string.match(regex);

	if(matches) {
		return matches[1];
	} else {
		return string;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

exports.run = function(server_name, text_channel_name, voice_channel_name, aliases_path, token) {

	aliases_file_path = aliases_path;

	bot.on("ready", () => {
		var server = bot.guilds.find("name", server_name);
		if(server === null) throw "Couldn't find server '" + server_name + "'";

		var voice_channel = server.channels.find(chn => chn.name === voice_channel_name && chn.type === "voice"); //The voice channel the bot will connect to
		if(voice_channel === null) throw "Couldn't find voice channel '" + voice_channel_name + "' in server '" + server_name + "'";
		
		text_channel = server.channels.find(chn => chn.name === text_channel_name && chn.type === "text"); //The text channel the bot will use to announce stuff
		if(text_channel === null) throw "Couldn't find text channel '#" + text_channel_name + "' in server '" + server_name + "'";

		voice_channel.join().then(connection => {voice_connection = connection;}).catch(console.error);

		fs.access(aliases_file_path, fs.F_OK, (err) => {
			if(err) {
				aliases = {};
			} else {
				try {
					aliases = JSON.parse(fs.readFileSync(aliases_file_path));
				} catch(err) {
					aliases = {};
				}
			}
		});

		bot.user.setGame();
		console.log("Connected!");
	});

	bot.login(token);
}

exports.setYoutubeKey = function(key) {
	yt_api_key = key;
}
