const TelegramBot = require('node-telegram-bot-api');
const randomFloat = require('random-float');

// Remplacez par votre token API
const API_TOKEN = "8191740195:AAElItof0jfiEFJu2d5zX-CZLvR5tUb9qaY";

// Limite de prédictions par utilisateur
const MAX_PREDICTIONS = 5;
const userPredictions = {};

// Initialiser le bot
const bot = new TelegramBot(API_TOKEN, { polling: true });

// Commande /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Réinitialiser les prédictions de l'utilisateur
  userPredictions[chatId] = 0;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Prédire", callback_data: "predict" }],
      ],
    },
  };

  bot.sendMessage(chatId, "Bienvenue ! Cliquez sur 'Prédire' pour commencer.", options);
});

// Gestion de la prédiction
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "predict") {
    // Vérifie la limite de prédictions
    if (userPredictions[chatId] >= MAX_PREDICTIONS) {
      bot.editMessageText(
        "❌ Vous avez atteint la limite de prédictions.\n" +
          "Contactez +22656967818 pour obtenir un accès illimité avec le code : 'Tall@2008'.",
        { chat_id: chatId, message_id: query.message.message_id }
      );
      return;
    }

    // Générer les prédictions
    const now = new Date();
    const coteA = randomFloat(4.0, 25.0).toFixed(2);
    const coteB = randomFloat(4.0, 25.0).toFixed(2);
    const assurance = randomFloat(3.0, 6.0).toFixed(2);

    const time1 = new Date(now.getTime() + randomFloat(2, 5) * 60000)
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);

    const time2 = new Date(now.getTime() + randomFloat(3, 6) * 60000)
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);

    const predictionText = `
🧨 MARC LUCKYJET V2 🧨

*HEURE :* ${time1} — ${time2}
*COTE :* x${Math.min(coteA, coteB)} — x${Math.max(coteA, coteB)}
*ASSURANCE :* x${assurance}

*Ces cotes viendront dans l'intervalle donné !*
    `;

    // Incrémenter le compteur de prédictions
    userPredictions[chatId] += 1;

    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Nouvelle Prédiction", callback_data: "predict" }],
        ],
      },
    };

    bot.editMessageText(predictionText, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: options.reply_markup,
    });
  }
});
