const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "demote",
    react: "🥏",
    alias: ["removeadmin"],
    desc: "Demote a user from admin.",
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
        if (!isBotAdmins) return reply("❌ I need admin privileges to demote members.");

        // ➡️ Détecter le participant à rétrograder (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("❌ Please mention or reply to a user to demote.");

        // ➡️ Vérifier si l'utilisateur est bien admin
        const isAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (!isAdmin) return reply("❗ User is not an admin.");

        // ➡️ Rétrograder le participant
        await conn.groupParticipantsUpdate(from, [target], "demote")
            .catch(err => {
                console.error(`⚠️ Failed to demote ${target}:`, err);
                return reply("❌ An error occurred while demoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*_@${tag} demoted successfully_*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing demote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});
