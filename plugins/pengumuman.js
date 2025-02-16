let handler = async (m, { conn, text, participants }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
 const fkontak = {
      "key": {
        "participants": "0@s.whatsapp.net",
        "remoteJid": "status@broadcast",
        "fromMe": false,
        "id": "Halo"
      },
      "message": {
        "contactMessage": {
          "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      "participant": "0@s.whatsapp.net"
    };
  if (/image/.test(mime)) {
    let media = await q.download();
    await conn.sendMessage(
      m.chat,
      {
        image: media,
        caption: text,
        mentions: participants.map(a => a.id)
      },
      { quoted: fkontak });
  } else {
    await conn.sendMessage(
      m.chat,
      { text: text, mentions: participants.map(a => a.id) },
      { quoted: fkontak }
    );
  }
};

handler.help = ['hidetag <pesan>'];
handler.tags = ['group'];
handler.command = /^(hidetag)$/i;

handler.group = true;
handler.admin = true;

module.exports = handler;