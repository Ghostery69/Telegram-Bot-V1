const axios = require('axios');

// Fonction pour appliquer le style de texte en gras
function stylizeAndMixText(text) {
  const boldMap = {
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴',
    h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻',
    o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂',
    v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚',
    H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡',
    O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨',
    V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
  };

  return text.split('').map(char => {
    // Vérifie si le caractère existe dans la table de caractères en gras, sinon laisse le caractère simple
    return boldMap[char] || char;
  }).join('');
}

module.exports = (bot) => {
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    
    // Ignore messages that start with a slash (command)
    if (userMessage.startsWith('/')) return;

    const prompt = userMessage; // Le message que l'utilisateur a envoyé

    if (!prompt) {
      return ctx.reply('Veuillez poser une question ! 🤔');
    }

    try {
      const { data: { response } } = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(prompt)}&uid=${ctx.from.id}`); //thank you kaiz

      // Stylisation du texte avec des emojis
      const styledResponse = stylizeAndMixText(response) + " 😎🔥"; // Ajouter des emojis à la fin

      const parts = [];
      for (let i = 0; i < styledResponse.length; i += 1999) {
        parts.push(styledResponse.substring(i, i + 1999));
      }

      for (const part of parts) {
        await ctx.reply(part); // Envoi de la réponse stylisée
      }

    } catch (error) {
      ctx.reply('Une erreur est survenue lors de la génération de la réponse. Veuillez réessayer plus tard. 😞');
      console.error('Erreur lors de l\'appel à l\'API GPT-4o:', error.message);
    }
  });
};
