module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Modified by OpenAI for AKASH",
	description: "Admin and Bot info.",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: {
		"request": "",
		"fs-extra": "",
		"axios": ""
	}
};

module.exports.run = async function({ api, event, args }) {
	const axios = global.nodemodule["axios"];
	const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
	const moment = require("moment-timezone");
	const juswa = moment.tz("Asia/Karachi").format("『D/MM/YYYY』 【HH:mm:ss】");

	const link = [
		"https://i.imgur.com/Kj2CmiZ.jpegv",
		"https://i.imgur.com/yiNOiVU.jpeg",
		"https://i.postimg.cc/Sx7Yk5D0/ef81664323554dd5c8f17f0826e26e5e.jpg",
		"https://i.postimg.cc/DwqYrqPQ/b123e2cb78bcb4fa5dcb53dfdeed2611.jpg"
	];

	const callback = () => api.sendMessage({
		body: `𒁍 BOT INFORMATION 𒁍

🤖 Bot Name: ${global.config.BOTNAME}
👑 Owner: 𝐀𝐊𝐀𝐒𝐇 (Nickname: AK)
🔗 Prefix: ${global.config.PREFIX}

🗓️ Date & Time: ${juswa}
⏳ Uptime: ${hours}h ${minutes}m ${seconds}s

🌐 Facebook:
https://www.facebook.com/profile.php?id=100004244983292

📌 Thank you for using ${global.config.BOTNAME}!
- Team AK`,
		attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
	}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"));

	return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
		.pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg"))
		.on("close", () => callback());
};
