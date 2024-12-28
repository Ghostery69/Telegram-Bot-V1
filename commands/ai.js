const axios = require('axios');

module.exports = (bot) => {
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text.trim();

    // Ignore les commandes (messages commençant par '/')
    if (userMessage.startsWith('/')) return;

    // Ignore les messages trop courts
    if (userMessage.length < 3) {
      return ctx.reply("🤔 Peux-tu développer un peu plus ta question ?");
    }

    // Réponse rapide pour signaler que le bot réfléchit
    await ctx.reply("⏳ Je réfléchis... Donne-moi un instant !");

    try {
      // Appel à l'API avec délai maximal de 5 secondes
      const { data: { response } } = await axios.get(
        `https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(userMessage)}&uid=${ctx.from.id}`,
        { timeout: 5000 } // Timeout de 5 secondes
      );

      // Ajout d'émojis cool
      const coolEmojis = ['🔥', '😎', '✨', '🚀', '🌟'];
      const emoji = coolEmojis[Math.floor(Math.random() * coolEmojis.length)];

      // Division des messages trop longs
      const parts = [];
      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      }

      // Envoi des réponses
      for (const part of parts) {
        await ctx.reply(`${part} ${emoji}`);
      }
    } catch (error) {
      // Gestion des erreurs (API ou délai dépassé)
      ctx.reply("❌ Une erreur est survenue ou le temps d'attente est dépassé. Réessaie plus tard !");
      console.error("Erreur API :", error.message);
    }
  });
};
