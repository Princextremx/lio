const { cmd } = require("../command");  
const { sleep } = require("../lib/functions");  

cmd({  
    pattern: "restart",  
    desc: "*ʀᴇsᴛᴀʀᴛ ᴍɪɴɪ ʙᴏᴛ*",  
    category: "owner",  
    react: "🔄",
    filename: __filename  
},  
async (conn, mek, m, { reply, isCreator }) => {  
    try {  
        if (!isCreator) {  
            return reply("*ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");  
        }  

        const { exec } = require("child_process");  
        reply("*ᴍɪɴɪ ʙᴏᴛ ʀᴇsᴛᴀʀᴛɪɴɢ...*");  
        await sleep(1500);  
        exec("pm2 restart all");  
    } catch (e) {  
        console.error(e);  
        reply(`${e}`);  
    }  
});
