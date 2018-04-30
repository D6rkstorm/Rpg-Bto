const Discord = require("discord.js");
const client = new Discord.Client();
var commandStr = "!";
var fs = require("fs");

var trustedUsers = ["121406882865872901"]
//, "122022693422891011"
function Character() {
    this.name = "";
    this.player = "";

    this.strength = 10;
    this.constitution = 10;
    this.dexterity = 10;
    this.intelligence = 10;
    this.wisdom = 10;
    this.charisma = 10;

    this.skills = [];    
}

var character = new Character();

////////////////////////////////////////////////////////////

var jsonString = JSON.stringify(character);

/*function appendFile(fileName, message, channel) {
	fs.appendFileSync(fileName, message + "\n", function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);		    	
	        return console.log("ERROR: " + err);
	    }
	});
    channel.send("The file was saved!");
    console.log("The file was saved!");
}

/*
function readFile(fileName, channel) {
	fs.readFile(fileName, "utf8", function(err, data) {
		if(err) {
	    	channel.send("ERROR: " + err);
	        return console.log("ERROR: " + err);
	    }
	    if(data != "") {
		    var t = data.split('\n');
		    for(var i = 0; i < t.length; i++) {
		    	if(t[i] != "") {
					channel.send(t[i]);
		    	}
		    }
		} else {
			channel.send("The file is empty!");
			console.log("The file is empty!");
		}
	});
}

function resetFile(fileName, channel) {
	fs.writeFile("save.txt", "", function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);
	        return console.log("ERROR: " + err);
	    }
	    channel.send("The file was reset!");
	    console.log("The file was reset!");
	});
}*/ 
function trustCheck(message){
	for(var i = 0; i < trustedUsers.length; i++)
	{
		if(message.author.id === trustedUsers[i])
		{return true;}
		else
		{return false;}
	}
	return false
}

client.on("message", (msg) => {
	if(msg.content.substring(0, (commandStr.length)) === commandStr)
	{
		var command = msg.content.substring(commandStr.length);

		if(command === "kill"){
			if(trustCheck(msg)) {
				msg.channel.send("Ending....");
				trustedUsers.length();
			} else {
				msg.channel.send("Insufficient permissions");
			}

		}

		if(command === "ping"){
			msg.channel.send("Pong at " + client.ping + " heartbeats!");
		}
		
		if(command === "tag"){
			msg.channel.send("My tag is " + commandStr);
		}
		
		if(command.includes("change")){
			var newTag = command.substring(7);
			console.log(newTag);
			commandStr = newTag;
			msg.channel.send("My new tag is " + commandStr);
		} 
		
		if(command === "help"){
			msg.channel.send("There are only a few commands, but development is continuing all the time! All commands are case sensitive, so watch out! Such commands include: ```Ping: replies Pong! \nTag: returns the current tag \nChange [arg]: changes the command signiture to [arg] \nHelp: returns this message```")
		}

		if(command.split(" ")[0] === "roll"){
			var information = command.split(" ")[1];
			var front = information.split("d")[0];
			var back = information.split("d")[0];
			var total = 0;
			for(var i = 0; i < front; i++){
				var output = Math.floor(Math.random() * (back + 1) + 1)
				console.log(output)
				msg.channel.send(output);
				total = total + output;
			}
			msg.channel.send("You rolled " + total + " in the end!")
		}
 /*		if(command.includes("ChangeName")){
			var newName = command.substring(11);
			console.log(newName);
			sheet.Name = newName;
			console.log(sheet.Name);
			msg.channel.send("User name has been changed to " + newName)
		}

		if(command === "Whats my name"){
			msg.channel.send("Your character name is " + sheet.Name)
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

client.login(krappa);
client.on("ready", () => { console.log("bot is running!")});