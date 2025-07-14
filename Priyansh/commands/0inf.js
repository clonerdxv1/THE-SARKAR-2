module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Modified by OpenAI for AKASH",
	description: "Admin and Bot info.",
	commandCategory: "system",
	cooldowns: 1,
	dependencies: {
		"request": "",
		"fs-extra": "",
		"axios": ""
	}
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
	const axios = global.nodemodule["axios"];
	const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];
	const moment = require("moment-timezone");

	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

	const link = [ "https://i.imgur.com/pcjD97x.jpeg"];

	const callback = () => api.sendMessage({
		body: `╭─────────────★彡
    🔰 𝗕𝗢𝗧 & 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🔰
╰─────────────★彡

👑 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: 𝐀𝐊𝐀𝐒𝐇 [ＡＫ]
🤖 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: ${global.config.BOTNAME}
📍 𝗣𝗥𝗘𝗙𝗜𝗫: ${global.config.PREFIX}

🗓️ 𝗧𝗢𝗗𝗔𝗬'𝗦 𝗗𝗔𝗧𝗘 & 𝗧𝗜𝗠𝗘:
⌚ ${juswa}

⏱️ 𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘:
🟢 ${hours}h ${minutes}m ${seconds}s

🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗟𝗜𝗡𝗞:
https://www.facebook.com/profile.php?id=100004244983292


━━━━━━━━━━━━━━━━━━━━━━━

✨ 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 ${global.config.BOTNAME} ✨
🔒 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬: 𝐀𝐊𝐀𝐒𝐇 🔒
╰─────────────★彡`,
		attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
	}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"));

	return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
		.pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg"))
		.on("close", () => callback());
};
