const Discord = require("discord.js");
const client = new Discord.Client();
var commandStr = "!";

/*var sheet = {
	User:"mentionTag",
	Name:"charName", 
	religion:"religion", 
	age:"age"
}*/

client.on("message", (msg) => {
	if(msg.content.substring(0, (commandStr.length)) === commandStr)
	{
		var command = msg.content.substring(commandStr.length);
		
		if(command === "ping"){
			msg.reply("Pong!");
		}
		
		if(command === "tag"){
			msg.reply("My tag is " + commandStr);
		}
		
		if(command.includes("change")){
			var newTag = command.substring(7);
			console.log(newTag);
			commandStr = newTag;
			msg.reply("My new tag is " + commandStr);
		} 
		
		if(command === "help"){
			msg.reply("There are only a few commands, but development is continuing all the time! All commands are case sensitive, so watch out! Such commands include: ```Ping: replies Pong! \nTag: returns the current tag \nChange [arg]: changes the command signiture to [arg] \nHelp: returns this message```")
		}

		/*if(command.includes("ChangeName")){
			var newName = command.substring(11);
			console.log(newName);
			sheet.Name = newName;
			console.log(sheet.Name);
			msg.reply("User name has been changed to " + newName)
		}

		if(command === "Whats my name"){
			msg.reply("Your character name is " + sheet.Name)
		}
Needs to have a folder that contains a number of files that are named the user name of the author, then it can search for the right file and read out the names and change the data of the file. 
		if(command === "createChar"){
			var kappa = new sheet()
			kappa.Name = "Default";
			kappa.User = msg.author.tag;
			kappa.religion = "Pastafarian" 
		}*/
	}
});

client.login(omegalul);
client.on("ready", () => { console.log("bot is running!")});