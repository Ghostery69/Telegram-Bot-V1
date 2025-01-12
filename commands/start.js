module.exports = (bot) => {
  bot.command('start', (ctx) => {
    const userName = ctx.from.first_name; 

    const welcomeMessage = `👋 𝗕𝗼𝗻𝗷𝗼𝘂𝗿𝘀 ${userName} \n\n𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗰𝗵𝗲𝗿𝘀 𝘂𝘁𝗶𝗹𝗶𝘀𝗮𝘁𝗲𝘂𝗿𝘀 𝗼𝘂 𝘂𝘁𝗶𝗹𝗶𝘀𝗮𝘁𝗿𝗶𝗰𝗲𝘀 𝗰'𝗲𝘀𝘁 𝗺𝗼𝗶 𝘀𝗽𝗶𝗿𝗶𝘁𝘆 𝗯𝗼𝘁 \n\n- /help consultez la liste de mes commandes \n\n veuillez contacter @Spirityh4ck si le bot à un problème 🤗`;

    ctx.reply(welcomeMessage);
  });
};
