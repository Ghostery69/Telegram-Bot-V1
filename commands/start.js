module.exports = (bot) => {
  bot.command('start', (ctx) => {
    const userName = ctx.from.first_name; 

    const welcomeMessage = `👋 Bonjour ${userName} \n\nBienvenue chère utilisateur ou utilisatrice moi c'est Spirity Chatbot \n\n- /help consultez la liste de mes commandes \n\n veuillez contacter @Spirityh4ck si le bot à un problème 🤗`;

    ctx.reply(welcomeMessage);
  });
};
