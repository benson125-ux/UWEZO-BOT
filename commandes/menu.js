const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `🎩 *Hello ${nomAuteurMessage}!* 🎩
━━━━━━━━━━━━━━━━━━━━
🚀 *BOT NAME:* 𝐁𝐄𝐍𝐒𝐎𝐍 𝐌𝐃  
━━━━━━━━━━━━━━━━━━━━
🌍 *SYSTEM INFO:*
💻 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
━━━━━━━━━━━━━━━━━━━━
⚙️ *BOT STATUS:*
⭕ ᴍᴏᴅᴇ: *${mode}*
💫 ᴘʀᴇғɪx: *[ ${prefixe} ]*
⏳ ᴛɪᴍᴇ: ${temps}
📆 ᴅᴀᴛᴇ: ${date}
━━━━━━━━━━━━━━━━━━━━
📢 *𝐂𝐇𝐀𝐍𝐍𝐄𝐋𝐒 & 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐎𝐍𝐒:*  
📺 𝐘𝐎𝐔𝐓𝐔𝐁𝐄:  
🔗 https://youtube.com/@popkid_254  
📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊:  
🔗 https://www.facebook.com/profile.php?id=100083389717604  
📢 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐆𝐑𝐎𝐔𝐏:  
🔗 https://whatsapp.com/channel/0029VadQrNI8KMqo79BiHr3l
📸 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌:  
🔗 https://www.instagram.com/popkid_ke  
━━━━━━━━━━━━━━━━━━━━
${readMore}
📜 *COMMAND MENU* 📜
━━━━━━━━━━━━━━━━━━━━\n`;

    let menuMsg = ``;

    for (const cat in coms) {
        menuMsg += `🔶 *${cat.toUpperCase()}* 🔸\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `   ♦️ ${cmd}\n`;
        }
        menuMsg += `━━━━━━━━━━━━━━━━━━━━\n`;
    }

    menuMsg += `✨ *𝐁𝐄𝐍𝐒𝐎𝐍 𝐌𝐃 - 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒅 𝒃𝒚 𝒃𝒆𝒏𝒔𝒐𝒏* ✨`;

    let imageUrl = "https://files.catbox.moe/bdewkf.jpg";

    try {
        zk.sendMessage(dest, { 
            image: { url: imageUrl }, 
            caption: infoMsg + menuMsg, 
            footer: "© Benson KE" 
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
