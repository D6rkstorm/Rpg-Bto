const Discord = require("discord.js");
const client = new Discord.Client();
var commandStr = "!";
var fs = require("fs");

var trustedUsers = ["121406882865872901","122022693422891011"]

function Character() {
    this.name = "";
    this.player = "";

    this.str = 10;
    this.dex = 10;
    this.iq = 10;
    this.ht = 10;

    this.percep = 10;
    this.hp = 10;
    this.varhp = 10;
    this.will = 10;
    this.fp = 10;
    this.varfp = 10;

    this.skills = [];    
}

var character = new Character();

var jsonString = JSON.stringify(character);

//If you cannot figure this one out, you must be daft. Find another project please. 
function createNewFile(fileName, message, channel) {
	fs.appendFileSync("characters/" + fileName, message, function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);		    	
	        return console.log("ERROR: " + err);
	    }
	});
}

//Creates a new file if the file name is not found, or adds a new line at the end of the text document. Use createNewFile when creating new files however
function appendFile(fileName, message, channel) {
	fs.appendFileSync("characters/" + fileName, message + "\n", function(err) {
	    if(err) {
	    	channel.send("ERROR: " + err);		    	
	        return console.log("ERROR: " + err);
	    }
	});
}

//Checks to see if the file with the name specified does exist
function doesExist(fileName) {
	if (fs.existsSync("characters/" + fileName)) {return true;} 
	else {return false;}
}

//Function that creates a new file with the character name specified by the command in Discord, with the first line being the ID of the author that sent the message. 
function createCharacter(msg,command) { 
	var val = command.substring(3);
		var isAlpha = function(ch){return ch.match(/[a-z]/i) === null};
		if(isAlpha(val))
		{
			msg.channel.send("Invalid Character name, please make sure it is alpha characters")
		}
		else
		{
			var name = val + ".txt";
			if(doesExist(name))
				{msg.channel.send("That character already exists, please choose another name!");}
			else {
 			createNewFile(name, "", msg.channel);
 			appendFile(name, "ID=" + msg.author.id, msg.channel);
 			msg.channel.send("Character created as " + name)
 			msg.channel.send("The file was saved!");
    		console.log("The file was saved as " + name);
			}
		}
}

//function jsut for testing tha tcreates a new defualt character for use within the charcter string array pre-defined as above. 
function createDefault(message){
	var temp = new Character();
	temp.name = "";
	temp.player = ""

	temp.str = 10;
    temp.dex = 10;
    temp.iq = 10;
	temp.ht = 10;

    temp.percep = 10;
    temp.hp = 10;
    temp.varhp = 10;
    temp.will = 10;
    temp.fp = 10;
    temp.varfp = 10;

    appendFile("Griffin.txt", "\n" + JSON.stringify(temp), message.channel);
    console.log("Character Generated");
}

function modify(message, name){
	if(isUser(readFile(name,message), message.author.id))
		{console.log("Able to edit " + message.author.tag);}
	else
		{console.log("Unable to edit " + message.author.tag);	}
}
//Method to check if the user that is requesting to modify the file is the same user that created the file
function isUser(text, key) { //text is the file split by newline, and you take the first element of that string, the key is the ID of the user. 
	var temp = text.split("\n");
	var id = temp[0];
	var tempID = "ID=" + key;
	if(id === tempID)
		return true;
	else
		return false;
}

//Function to read out a file and return the text of the file. 
function readFile(filename,msg){
	var temp = fs.readFileSync("characters/" + filename);
	temp = temp.toString("utf-8");
	return temp;
}

//Method that goes through the files in the "characters" directory and finds the characters with the same ID as the author of the message"
function fileSearchS(msg){
	var filesFound = fs.readdirSync("characters/");
	var specificFiles = [""];
	for(var i = 0; i < filesFound.length; i++)
	{
		var temp = fs.readFileSync("characters/" + filesFound[i]);
		temp = temp.toString("utf-8",0);
		if(isUser(temp, msg.author.id))
			specificFiles.push(filesFound[i])
	}
	if(specificFiles.length > 0)
		specificFiles.splice(0,1);
	var text = "";
	for(var j = 0; j < specificFiles.length; j++)
	{
		text = specificFiles[j] + ', ' + text;
	}
	msg.reply("we found " + specificFiles.length + " file(s) that you have created! Use the \"modify\" command to edit them. The file names are ```" + text + "```");
	text = "";
}

//Method that finds all the files in the "characters" directory, regardless of the user that created them
function fileSearch(msg){
	var filesFound = fs.readdirSync("characters/");
	msg.channel.send("I found " + filesFound.length + " file(s)! The files names are:")
	var names = ""
	for(var i = 0; i < filesFound.length; i++)
	{
		names = filesFound[i] + ", " + names;
	}
	msg.channel.send("```" + names + "```")
}

//method that checks to see if the author of the message is part of the trusted users group. 
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
 		
 		if(command === "searchMe"){
 			fileSearchS(msg);
 		}

 		if(command === "search") {
 			fileSearch(msg);
 		}

 		if(command.substring(0,2) === "cc"){
 			createCharacter(msg,command);
 		}

 		if(command === "create"){
 			createDefault(msg);
 		}

 		if(command.substring(0,6) === "modify"){
			var name = command.substring(7);
			modify(msg, name);
 		}
	}
});

client.login("NDM5MDgzNzIyNDkxNDI4ODY0.DcqFJQ.8adxFOtKlD3NvCMk5khY0SHOVLs");
client.on("ready", () => { console.log("bot is running!")});