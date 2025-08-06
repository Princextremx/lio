const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "promote",
    react: "💫",
    alias: ["addadmin"],
    desc: "Promote a user to admin.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins or the owner can use this command.");
        if (!isBotAdmins) return reply("❌ I need admin privileges to promote members.");

        // ➡️ Détecter le participant à promouvoir (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("❌ Please mention or reply to a user to promote.");

        // ➡️ Vérifier si l'utilisateur est déjà admin
        const isAlreadyAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (isAlreadyAdmin) return reply("❗ User is already an admin.");

        // ➡️ Promouvoir le participant
        await conn.groupParticipantsUpdate(from, [target], "promote")
            .catch(err => {
                console.error(`⚠️ Failed to promote ${target}:`, err);
                return reply("❌ An error occurred while promoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*_@${tag} promoted successfully_*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing promote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});
