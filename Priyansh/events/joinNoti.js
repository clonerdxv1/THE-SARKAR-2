module.exports.config = {
        name: "joinNoti",
        eventType: ["log:subscribe"],
        version: "1.0.1",
        credits: "CatalizCS", //fixing ken gusler
        description: "Notify bot or group member with random gif/photo/video",
        dependencies: {
                "fs-extra": "",
                "path": "",
                "pidusage": ""
        }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

        const path = join(__dirname, "cache", "joinGif");
        if (existsSync(path)) mkdirSync(path, { recursive: true });        

        const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
        const { join } = global.nodemodule["path"];
        const { threadID } = event;
        if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
                api.changeNickname(`{ ${global.config.PREFIX} } × ${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
                const fs = require("fs");
            return api.sendMessage("Hello Everyone 🙋‍♂️ Bot is Now Connected 🔗", event.threadID, () => 
  api.sendMessage({
    body: `
╚»★  𝙱𝙾𝚃 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳  ★«╝

✨ Connected Successfully to Group!
🔹 Bot Status: Online & Ready
🔹 Prefix: [ ${global.config.PREFIX} ]
🔹 Owner: 𝐀𝐊𝐀𝐒𝐇 (AK)

━━━━━━━━━━━━━━━━━━
🔧 For Commands: Type "${global.config.PREFIX}help"
📘 Owner's Facebook:
https://www.facebook.com/profile.php?id=100004016155600
━━━━━━━━━━━━━━━━━━

📌 𝗡𝗢𝗧𝗘:
- This bot may stop anytime (backup recommended).
- For new bot setup or issues, re-add owner to the group.
- Problems? Use another ID and run the bot.

💖 Thanks for using this bot by AKASH!
━━━━━━━━━━━━━━━━━━
`
`, attachment: fs.createReadStream(__dirname + "/cache/botjoinig.mp4")} ,threadID));
        }
        else {
                try {
                        const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
                        let { threadName, participantIDs } = await api.getThreadInfo(threadID);

                        const threadData = global.data.threadData.get(parseInt(threadID)) || {};
                        const path = join(__dirname, "cache", "joinGif");
                        const pathGif = join(path, `${threadID}.gif`);

                        var mentions = [], nameArray = [], memLength = [], i = 0;

                        for (id in event.logMessageData.addedParticipants) {
                                const userName = event.logMessageData.addedParticipants[id].fullName;
                                nameArray.push(userName);
                                mentions.push({ tag: userName, id });
                                memLength.push(participantIDs.length - i++);
                        }
                        memLength.sort((a, b) => a - b);

                     (typeof threadData.customJoin == "undefined") ? 
msg = `Hey {name},\n\n𒁍 »─── 𓆩✨𓆪 ───« 𒁍\n\nYou're the {soThanhVien}ᵗʰ member\nof the {threadName} group 💌\n\n𒁍 »─── 𓆩🌸𓆪 ───« 𒁍\n\nWe’re so glad to have you!\nPlease enjoy your stay & make great memories ✨\n\n💖 ━━━━━━━ 💖\n\n🔐 My one & only owner:\n✦ 𝐀𝐊𝐀𝐒𝐇 (AK) ✦\nForever grateful to him 💫\n\n🤍 Welcome once again! 🕊️`  : msg = threadData.customJoin;
                        msg = msg
                        .replace(/\{name}/g, nameArray.join(', '))
                        .replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
                        .replace(/\{soThanhVien}/g, memLength.join(', '))
                        .replace(/\{threadName}/g, threadName);

                        if (existsSync(path)) mkdirSync(path, { recursive: true });

                        const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

                        if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
                        else if (randomPath.length != 0) {
                                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
                        }
                        else formPush = { body: msg, mentions }

                        return api.sendMessage(formPush, threadID);
                } catch (e) { return console.log(e) };
        }
                    }
