module.exports.config = {
  name: "ddp", // Command for sending DP
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random display picture (DP)", 
  commandCategory: "Image",
  usages: "ddp", 
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  // Updated DP links
  var link = [
    "https://i.imgur.com/h7FokAc.jpeg",
    "https://i.imgur.com/embg70D.jpeg",
    "https://i.imgur.com/FOADGjw.jpeg",
    "https://i.imgur.com/Zs7PY3f.jpeg",
    "https://i.imgur.com/sTx5fNB.jpeg",
    "https://i.imgur.com/fNZRIzD.jpeg",
    "https://i.imgur.com/6Wpb7n0.jpeg",
    "https://i.imgur.com/CSgeNFj.jpeg",
    "https://i.imgur.com/KxOOadd.jpeg",
    "https://i.imgur.com/fYhhHjI.jpeg",
    "https://i.imgur.com/fWTRlIK.jpeg",
    "https://i.imgur.com/NDPGeLL.jpeg",
    "https://i.imgur.com/K46AFIc.jpeg",
    "https://i.imgur.com/pqmNFD5.jpeg",
    "https://i.imgur.com/dQzYISc.jpeg",
    "https://i.imgur.com/t96fKpt.jpeg",
    "https://i.imgur.com/qdcWPnq.jpeg",
    "https://i.imgur.com/H3xkSTa.jpeg",
    "https://i.imgur.com/3CAKqkD.jpeg",
    "https://i.imgur.com/V5XGMo9.jpeg",
    "https://i.imgur.com/oJ1i3cQ.jpeg",
    "https://i.imgur.com/FZJIJ7N.jpeg",
    "https://i.imgur.com/6NKZzRd.jpeg",
    "https://i.imgur.com/vuyDXxx.jpeg",
    "https://i.imgur.com/mPkan8O.jpeg",
    "https://i.imgur.com/8JgirHa.jpeg",
    "https://i.imgur.com/m7Z6UH4.jpeg",
    "https://i.imgur.com/dh4XPW4.jpeg",
    "https://i.imgur.com/BCaAiS2.jpeg",
    "https://i.imgur.com/1HQ7xSf.jpeg",
    "https://i.imgur.com/EzBkESj.jpeg",
    "https://i.imgur.com/5vxdPr4.jpeg"
  ];

  // React with ❤️ emoji
  api.setMessageReaction("❤️", event.messageID, (err) => {}, true);

  // Stylish message before sending the DP
  api.sendMessage(
    "ᱪ❤️ᱪ 𝘾𝙊𝙋𝙐𝙇𝙀 𝘿𝙋 𝘾𝙃𝘼𝙃𝙄𝙀 𝙊𝙆𝙄𝙀 𝘽𝙊𝙎𝙎 🖼️",
    event.threadID,
    () => {
      // Send the DP after the message
      var callback = () => api.sendMessage(
        { body: `ᱪ❤️ᱪ 𝐀𝐊 ᱪ❤️ᱪ: ${link.length} 𝗗𝗣𝘀 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a DP and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
