module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "RDX ZAIN",
	description: "Admin and Bot info.",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
var link =                                     
["https://i.postimg.cc/SRM3Y032/20250714-024406.jpg"];
var callback = () => api.sendMessage({
  body: `╭──🌟 BOT INFO 🌟──╮

🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
👑 𝗢𝘄𝗻𝗲𝗿: 𝐀𝐊𝐀𝐒𝐇
🔖 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: AK

📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 
https://www.facebook.com/profile.php?id=100004016155600

⏱️ 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}:${minutes}:${seconds}
📅 𝗧𝗼𝗱𝗮𝘆: ${juswa}

🛠️ 𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}

╰─────•💻•─────╯

💬 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 ${global.config.BOTNAME} 💖`

`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };
