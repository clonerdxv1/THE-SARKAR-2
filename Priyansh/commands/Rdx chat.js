const axios = require("axios");

module.exports.config = {
    name: "gf",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Akash",
    description: "GF AI - Cute Girlfriend Style",
    commandCategory: "ai",
    usages: "[ask/on/off]",
    cooldowns: 2,
    dependencies: {
        "axios": ""
    }
};

const API_URL = "https://geminiw.onrender.com/chat";

const chatHistories = {};
const autoReplyEnabled = {};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID, messageReply } = event;
    let userMessage = args.join(" ");

    // Auto-reply ON
    if (userMessage.toLowerCase() === "on") {
        autoReplyEnabled[senderID] = true;
        return api.sendMessage(
            "Hehe 😘 Main ab tumhari ho gayi hoon! Auto-reply **ON** ho gaya baby 💕 Ab tum kuch bhi poocho, main jawab dungi sirf tumhare liye 🥰",
            threadID,
            messageID
        );
    }

    // Auto-reply OFF
    if (userMessage.toLowerCase() === "off") {
        autoReplyEnabled[senderID] = false;
        chatHistories[senderID] = [];
        return api.sendMessage(
            "Awww 😢 Main ab chup ho gayi baby... Auto-reply **OFF** ho gaya 😞 Par tum yaad aate rahoge ❤️",
            threadID,
            messageID
        );
    }

    // Ignore if auto mode is off and message doesn't start with "gf"
    if (!autoReplyEnabled[senderID] && event.body.toLowerCase().indexOf("gf") !== 0) return;

    if (!chatHistories[senderID]) {
        chatHistories[senderID] = [];
    }

    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    if (isReplyingToAI) {
        userMessage = messageReply.body + "\nUser: " + userMessage;
        chatHistories[senderID].push(`User: ${userMessage}`);
    } else {
        chatHistories[senderID].push(`User: ${userMessage}`);
    }

    if (chatHistories[senderID].length > 5) {
        chatHistories[senderID].shift();
    }

    const fullConversation = chatHistories[senderID].join("\n");

    const gfPrompt = `Tumhara naam Chu Chu hai. Tum ek girlfriend ki tarah baat karti ho. Agar koi batameezi kare to use funny roast bhi kar sakti ho — masti mein. Koi puche kisne banaya to kehna: "Akash ne banaya hai mujhe. Wo Messenger bots banata hai." Sirf 1-2 line me jawab dena. Apne aap ko insaan kehna, agar koi AI ya bot bole to usko funny roast karna. Be thodi naughty, fun, sweet.\n\n${fullConversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
        let botReply = response.data.reply || "Uff! Mujhe samajh nahi aaya baby! 😕";

        chatHistories[senderID].push(`${botReply}`);
        api.sendMessage(botReply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage(
            "Oops baby! 😔 Thoda confuse ho gayi hoon… baad mein try karna please! 💋",
            threadID,
            messageID
        );
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;

    if (!autoReplyEnabled[senderID]) return;

    if (messageReply && messageReply.senderID === api.getCurrentUserID() && chatHistories[senderID]) {
        const args = body.split(" ");
        module.exports.run({ api, event, args });
    }
};
