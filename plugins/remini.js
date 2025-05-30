let fetch = require('node-fetch')
let { fileIO, api} = require('../lib/uploadFile.js')
let fs = require('fs')
let handler = async (m, { conn, usedPrefix, command, text }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar dengan caption .remini'
m.reply(wait)
let media = await q.download()
let url = await fileIO(media)
let reminiv1 = await downloadAsBuffer(`${webapi}api/ai/remini?url=${url}&apikey=${apichan}`)
if(reminiv1.length === 127){
    let reminiv2 = await downloadAsBuffer(`${webapi}api/ai/upscale?url=${url}&apikey=${apichan}`)
            conn.sendFile(m.chat, reminiv2, 'remini.jpg', '👌 Done Menggunakan ReminiV2', m)
}else{
//console.log(reminiv1.length);
 conn.sendFile(m.chat, reminiv1, 'remini.jpg', '👌 Done Menggunakan ReminiV1', m)
//conn.sendFile(m.chat, hasil, '', wm, m)
	
}
}
handler.help = ['remini']
handler.tags = ['maker']
handler.command = /^(remini|hd|hdr|upscale)$/i
handler.limit = true

module.exports = handler
async function downloadAsBuffer(url) {
    const https = require("https");
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const chunks = [];
            response.on("data", (chunk) => chunks.push(chunk)); // Mengumpulkan data dalam buffer
            response.on("end", () => resolve(Buffer.concat(chunks))); // Gabungkan semua buffer
            response.on("error", reject); // Tangani kesalahan
        });
    });
}
async function getBuffer(url, options) {
        try {
                options ? options : {}
                const res = await axios({
                        method: "get",
                        url,
                        headers: {
                                'DNT': 1,
                                'Upgrade-Insecure-Request': 1
                        },
                        ...options,
                        responseType: 'arraybuffer'
                })
                return res.data
        } catch (e) {
                console.log(`Error : ${e}`)
        }
}