
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');
const pkg = require('../package.json');

cmd({
    pattern: "uptime",
    alias: ["runtime", "run"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "❇️",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const uptime = runtime(process.uptime());
        const seconds = Math.floor(process.uptime());
        const startTime = new Date(Date.now() - seconds * 1000);
        const version = pkg.version || "1.0.0";

        const styles = [
`╭──『 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 』
│ ⏱️ ${uptime}
│ 🧭 ${seconds} seconds
│ 🚀 Started: ${startTime.toLocaleString()}
╰──────────────⭑─➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`╭─ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
│♢ ʀᴜɴɴɪɴɢ: ${uptime}
│♢ sᴇᴄᴏɴᴅs: ${seconds}
│♢ sɪɴᴄᴇ: ${startTime.toLocaleDateString()}
╰──────────────⭑─➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`╭─ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
│ • ᴛɪᴍᴇ: ${uptime}
│ • sᴇᴄᴏɴᴅs: ${seconds}
│ • sᴛᴀʀᴛᴇᴅ: ${startTime.toLocaleString()}
╰━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`╭─ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
│ ⏳ ${uptime}
│ 🕰️ ${startTime.toLocaleString()}
│ 🔢 ${seconds} sᴇᴄᴏɴᴅs
╰──────────────⭑─➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`
╭─ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
│  ʀᴜɴᴛɪᴍᴇ: ${uptime}
│  sᴇᴄᴏɴᴅs:: ${seconds}
│  sɪɴᴄᴇʀᴇʟʏ: ${startTime.toLocaleString()}
╰━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`> ╭━ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
> ┃🟢 ᴏɴʟɪɴᴇ ғᴏʀ: ${uptime}
> ┃🔢 sᴇᴄᴏɴᴅs: ${seconds}
> ┃📅 sɪɴᴄᴇ: ${startTime.toLocaleString()}
> ╰━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,

`╭─ 「 *\`𝐌𝐈𝐍𝐈-𝐁𝐎𝐓\`* 」
│◈ ᴅᴜʀᴀᴛɪᴏɴ: ${uptime}
│◈ sᴇᴄᴏɴᴅs: ${seconds}
│◈ sᴛᴀʀᴛ ᴛɪᴍᴇs: ${startTime.toLocaleString()}
│◈ sᴛᴀʙɪʟɪᴛʏ: 100%
╰────────────────❂
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`
        ];

        let selectedStyle;
        if (args[0] && args[0].toLowerCase().startsWith("style")) {
            const index = parseInt(args[0].replace("style", "")) - 1;
            if (!isNaN(index) && styles[index]) {
                selectedStyle = styles[index];
            } else {
                return reply(`❌ Style not found.\n✅ Use: style1 to style${styles.length}`);
            }
        } else {
            selectedStyle = styles[Math.floor(Math.random() * styles.length)];
        }

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/arelfv.jpg' },
            caption: selectedStyle,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418161689316@newsletter',
                    newsletterName: '𝐌𝐈𝐍𝐈-𝐁𝐎𝐓',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
