const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

const smallCaps = {
  "A": "ᴀ",
  "B": "ʙ",
  "C": "ᴄ",
  "D": "ᴅ",
  "E": "ᴇ",
  "F": "ꜰ",
  "G": "ɢ",
  "H": "ʜ",
  "I": "ɪ",
  "J": "ᴊ",
  "K": "ᴋ",
  "L": "ʟ",
  "M": "ᴍ",
  "N": "ɴ",
  "O": "ᴏ",
  "P": "ᴘ",
  "Q": "ǫ",
  "R": "ʀ",
  "S": "s",
  "T": "ᴛ",
  "U": "ᴜ",
  "V": "ᴠ",
  "W": "ᴡ",
  "X": "x",
  "Y": "ʏ",
  "Z": "ᴢ"
};

const toSmallCaps = (text) => {
  return text.split('').map(char => smallCaps[char.toUpperCase()] || char).join('');
};

cmd({
  pattern: "menu",
  alias: ["allmenu", "mini"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "💫",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
       const sender = m?.sender || mek?.key?.participant || mek?.key?.remoteJid || 'unknown@s.whatsapp.net';
    const username = m.pushName || 'User';
    const version = config.VERSION || '2.0.0';

    // Infos temps
    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };
    const uptimeStr = uptime();
    const time = moment().tz(config.TIME_ZONE || 'UTC').format('HH:mm:ss');
    const date = moment().tz(config.TIME_ZONE || 'UTC').format('DD/MM/YYYY');

    let menuText = `*╭══〘〘 𝐌𝐄𝐆𝐀𝐋𝐎𝐃𝐎𝐍-𝐌𝐃* 〙〙═⊷
┃❍ *ᴜsᴇʀ* : @${sender.split("@")[0]}
┃❍ *ᴘʟᴜɢɪɴs* : ${commands.length}
┃❍ *ᴅᴀᴛᴇ ᴛᴏᴅᴀʏ* : ${date}
┃❍ ᴘʀᴇғɪx : [ ${config.PREFIX} ]
┃❍ *ᴍᴏᴅᴇ* : 『 ${config.MODE} 』
┃❍ *ᴠᴇʀsɪᴏɴ* : ${version}
┃❍ *ᴄʀᴇᴀᴛᴏʀ* : ᴅʏʙʏ ᴛᴇᴄʜ 
╰═════════════════⊷`;


    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n┌── 『 * ${k.toUpperCase()} MENU* 』`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `\n*┋⁠➳* ${config.PREFIX}${toSmallCaps(usage)}`;
      });
      menuText += `\n╰───────────────❃`;
    }

    const selectedStyle = menuText;

    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: selectedStyle,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401051937059@newsletter',
          newsletterName: '𝐌𝐄𝐆𝐀𝐋𝐎𝐃𝐎𝐍-𝐌𝐃',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
