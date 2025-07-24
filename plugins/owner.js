const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "💫", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/p01dj2.jpg' }, // Image URL from your request
            caption: `╭⭑━「 *\`𝐌𝐈𝐍𝐈-𝐗𝐓𝐑𝐄𝐌𝐄\`* 」
┃◈┃• *ʜᴇʀᴇ ɪs ᴛʜᴇ ᴏᴡɴᴇʀ ᴅᴇᴛᴀɪʟs*
┃◈┃• *ɴᴀᴍᴇ* : *${config.OWNER_NAME}*
┃◈┃• *ɴᴜᴍʙᴇʀ* ${ownerNumber}
┃◈┃• *ᴠᴇʀsɪᴏɴ*: 1.0 ʙᴇᴛᴀ
┃◈└───────────┈⊷
╰⭑━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418161689316@newsletter',
                    newsletterName: '𝐌𝐈𝐍𝐈-𝐗𝐓𝐑𝐄𝐌𝐄',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/r20dpn.mp3' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
