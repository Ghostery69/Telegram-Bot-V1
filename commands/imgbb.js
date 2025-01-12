const axios = require('axios');
const FormData = require('form-data');

module.exports = (bot) => {
  const imgbbApiKey = "1b4d99fa0c3195efe42ceb62670f2a25"; 

  bot.command('imgbb', async (ctx) => {
    const reply = ctx.message.reply_to_message;

    if (!reply || !reply.photo) {
      return ctx.reply('❌ 𝘃𝗲𝘂𝗶𝗹𝗹𝗲𝘇 𝗿𝗲𝗽𝗼𝗻𝗱𝗿𝗲 𝗮 𝘂𝗻 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝗮𝗻𝘁 𝘂𝗻𝗲 𝗶𝗺𝗮𝗴𝗲.');
    }

    try {
      const photoArray = reply.photo;
      const largestPhoto = photoArray[photoArray.length - 1]; 
      const fileId = largestPhoto.file_id;

      const fileData = await bot.telegram.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileData.file_path}`;

      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const formData = new FormData();
      formData.append('image', Buffer.from(response.data, 'binary'), { filename: 'image.png' });

      const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: formData.getHeaders(),
        params: {
          key: imgbbApiKey,
        },
      });

      const imageLink = imgbbResponse.data.data.url;

      return ctx.reply(`✅ Image téléchargée avec succès : ${imageLink}`);
    } catch (error) {
      console.error(error);
      return ctx.reply('❌ Échec du téléchargement de l\'image sur Imgbb. Veuillez réessayer plus tard.');
    }
  });
};
