const axios = require('axios');

module.exports = (bot) => {
  // Intercepte tous les messages texte envoyés par les utilisateurs
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text.trim(); // Récupère le message texte envoyé par l'utilisateur

    // Ignore les messages qui commencent par un "/"
    if (userMessage.startsWith('/')) {
      return; // Ne fait rien si le message est une commande
    }

    try {
      // Appel à l'API avec le message utilisateur
      const { data: { response } } = await axios.get(
        `https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(userMessage)}&uid=${ctx.from.id}`
      );

      // Ajout d'émojis "cool" à la réponse
      const coolEmojis = ['🔥', '😎', '✨', '🚀', '🌟'];
      const emoji = coolEmojis[Math.floor(Math.random() * coolEmojis.length)]; // Sélectionne un émoji aléatoire

      // Divise la réponse en parties si elle est trop longue pour Telegram
      const parts = [];
      for (let i = 0; i < response.length; i += 1999) {
        parts.push(response.substring(i, i + 1999));
      }

      // Envoie chaque partie de la réponse, avec un émoji ajouté
      for (const part of parts) {
        await ctx.reply(`${part} ${emoji}`);
      }
    } catch (error) {
      // Gestion des erreurs
      ctx.reply("❌ Une erreur est survenue lors de la génération de la réponse. Veuillez réessayer plus tard.");
      console.error("Erreur lors de l'appel à l'API GPT-4o :", error.message);
    }
  });
};
