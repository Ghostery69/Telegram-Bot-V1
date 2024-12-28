const axios = require('axios');

module.exports = (bot) => {
  // Intercepte tous les messages texte envoyés par les utilisateurs
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text.trim(); // Récupère le message texte envoyé par l'utilisateur

    // Si le message est vide, répond avec un message d'erreur
    if (!userMessage) {
      return ctx.reply("Désolé, je n'ai rien compris. Essayez d'envoyer un message valide.");
    }

    try {
      // Appel à l'API avec le message utilisateur
      const { data: { response } } = await axios.get(
        `https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(userMessage)}&uid=${ctx.from.id}`
      ); // Merci Kaiz pour l'API

      // Divise la réponse en parties si elle est trop longue pour Telegram
      const parts = [];
      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      }

      // Envoie chaque partie de la réponse à l'utilisateur
      for (const part of parts) {
        await ctx.reply(part);
      }
    } catch (error) {
      // Gestion des erreurs
      ctx.reply("Une erreur est survenue lors de la génération de la réponse. Veuillez réessayer plus tard.");
      console.error("Erreur lors de l'appel à l'API GPT-4o :", error.message);
    }
  });
};
