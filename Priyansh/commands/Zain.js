 const fs = require("fs");
module.exports.config = {
	name: "zain",
		version: "1.0.1",
	hasPermssion: 0,
	credits: "Zain", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "...",
		cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("owner") ||
		 react.includes("Arun") || 
react.includes("arun")) {
		var msg = {
				body: "───────────────\n👑 𝙊𝙬𝙣𝙚𝙧 𝙄𝙉𝙁𝙊\n───────────────\n\n🔹 𝗡𝗮𝗺𝗲: AKASH\n🔸 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: AK\n📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:\nhttps://www.facebook.com/profile.php?id=100004016155600\n\n───────────────\n🤖 𝘽𝙤𝙩 𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚\n───────────────\n\nHey! I’m a clean and sharp bot made under AK’s command ⚙️  \nNo drama. No flex. Just smooth features, fast replies, and pure vibe.\n\n───────────────\n📩 𝘽𝙤𝙩 𝙎𝙪𝙥𝙥𝙤𝙧𝙩\n───────────────\n\nWant your own custom bot?  \nHaving any issue? Reach out at the FB link above.\n\n✅ Stay updated. Stay connected with Team AK.`",
			attachment: fs.createReadStream(__dirname + `/noprefix/sarkar.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
		api.setMessageReaction("🫡", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
