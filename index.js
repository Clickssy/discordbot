const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ytdl = require ('ytdl-core'); 

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Under Development!", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let token =  botconfig.token;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}join`){
    var VC = message.member.voiceChannel;
    if (!VC)
    return message.reply("Please join a voice channel first")
    VC.join()
    .then(connection => {
    const dispatcher = connection.playStream('http://185.80.220.12:7021/stream');
    message.reply('Now playing Clickssys Music Station!');
    dispatcher.on("end", end => {VC.leave()});})
    .catch(console.error);};

  if(cmd === `${prefix}disconnect`){
    var VC = message.guild.me.voiceChannel;
    message.reply("Successfully Disconnected");
    VC.leave()
}

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor(0x04d5fd)
    .setTitle("Clickssy's Music Station bot")
    .setFooter("Main Developer: Clickssy | Website Developer: HuskyPlays")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username, true)
    .addField("Guilds:", bot.guilds.size, true)
    .addField("Users:", bot.users.size, true)
    .addField("Discord Server", "https://discord.gg/b7mZnHg", true)
    .addField("Invite me to your server", "https://discordapp.com/api/oauth2/authorize?client_id=536628574187290624&scope=bot&permissions=1")
    


    return message.channel.send(botembed);
  }

});

bot.login(botconfig.token);