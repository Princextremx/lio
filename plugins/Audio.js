const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');
const ytdl = require('ytdl-core');

cmd({
  pattern: "audio",
  desc: "Convertit une vidéo en audio MP3",
  category: "audio",
  filename: __filename,
  react: "🎧"
}, async (m, { quoted, args, mime }) => {
  const isUrl = /https?:\/\/[^\s]+/.test(args[0]);

  // Cas 1 : L'utilisateur envoie une URL YouTube
  if (isUrl && args[0].includes("youtube")) {
    try {
      const info = await ytdl.getInfo(args[0]);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
      const mp3Path = path.join(__dirname, `${title}.mp3`);

      const stream = ytdl(args[0], { quality: 'highestaudio' })
        .pipe(fs.createWriteStream(mp3Path));

      stream.on('finish', async () => {
        await m.sendMessage(m.chat, { audio: fs.readFileSync(mp3Path), mimetype: 'audio/mpeg' }, { quoted: m });
        fs.unlinkSync(mp3Path);
      });

    } catch (err) {
      m.reply("❌ Erreur lors du téléchargement ou conversion.");
      console.error(err);
    }

  // Cas 2 : L'utilisateur répond à une vidéo dans la conversation
  } else if ((quoted && quoted.videoMessage) || (mime && mime.includes('video'))) {
    try {
      const videoBuffer = await m.downloadMediaMessage(quoted || m);
      const videoPath = path.join(__dirname, 'temp_video.mp4');
      const audioPath = path.join(__dirname, 'converted_audio.mp3');

      fs.writeFileSync(videoPath, videoBuffer);

      exec(`ffmpeg -i ${videoPath} -vn -ab 128k -ar 44100 -y ${audioPath}`, async (err) => {
        if (err) {
          m.reply("❌ Erreur lors de la conversion.");
          console.error(err);
          return;
        }

        await m.sendMessage(m.chat, { audio: fs.readFileSync(audioPath), mimetype: 'audio/mpeg' }, { quoted: m });

        fs.unlinkSync(videoPath);
        fs.unlinkSync(audioPath);
      });

    } catch (err) {
      m.reply("❌ Impossible de convertir cette vidéo.");
      console.error(err);
    }

  } else {
    m.reply("📌 *Utilisation :* Répond à une vidéo ou envoie un lien YouTube\n\nExemple : `.mp3 https://youtu.be/abc123`");
  }
});
