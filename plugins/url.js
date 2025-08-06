
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const mime = require("mime-types");
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url"],
  'react': '🖇',
  'desc': "Convert media to URL using catbox.moe API.",
  'category': 'anime',
  'use': '.maid',
  'filename': __filename
}, async (_0x3b6f3e, _0x5048d7, _0xe7ca56, {
  from: _0x33ef7e,
  quoted: _0x1e42a1,
  reply: _0x41dee2
}) => {
  try {
    let _0x548a72 = _0x1e42a1 ? _0x1e42a1 : _0xe7ca56;
    let _0x22cd5b = (_0x548a72.msg || _0x548a72).mimetype || '';
    if (!_0x22cd5b) {
      throw "❌ *Error: ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇᴅɪᴀ ᴍᴇssᴀɢᴇ.*";
    }
    let _0x4e83b5 = await _0x548a72.download();
    const _0x3bc29d = mime.extension(_0x22cd5b) || '';
    let _0x402703 = path.join(os.tmpdir(), "catboxupload_" + Date.now() + (_0x3bc29d ? '.' + _0x3bc29d : ''));
    fs.writeFileSync(_0x402703, _0x4e83b5);
    let _0x219f09 = new FormData();
    _0x219f09.append('reqtype', "fileupload");
    _0x219f09.append("fileToUpload", fs.createReadStream(_0x402703));
    let _0x35d557 = await axios.post("https://catbox.moe/user/api.php", _0x219f09, {
      'headers': {
        ..._0x219f09.getHeaders()
      }
    });
    let _0x210f03 = _0x35d557.data.trim();
    if (!_0x210f03.startsWith('http')) {
      throw "❌ *Error: Invalid response from catbox.moe API.*";
    }
    fs.unlinkSync(_0x402703);
    _0x41dee2("*_☃️xᴛʀᴇᴍᴇ ᴜᴘʟᴏᴀᴅᴇᴅ sᴜᴄᴄᴇsғᴜʟʏ_*\n\n" + ("*Size:* " + _0x4e83b5.length + " Byte(s)\n\n") + ("*URL:* " + _0x210f03 + "\n\n") + "> *ᴜᴘʟᴏᴀᴅᴇᴅ ʙʏ ᴍɪɴɪ ʙᴏᴛ*");
  } catch (_0x3e55c0) {
    _0x41dee2("❌ *An error occurred:*\n" + _0x3e55c0);
    console.error(_0x3e55c0);
  }
});
