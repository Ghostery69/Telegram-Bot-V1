module.exports = (bot) => {
    bot.command('help', (ctx) => {
        const commands = [
            { command: '/ai', description: 'poser des questions' },
            { command: '/help', description: 'Afficher cette liste des commandes' },
            { command: '/admin', description: 'Voir la liste des administrateurs' },
            { command: '/addadmin <ID>', description: 'Ajouter un adminins' },
            { command: '/removeadmin <ID>', description: 'Retirer un admins' },
            { command: '/translate <langue_source> <langue_cible> <texte>', description: 'Traduire vos textes dans tous les langues que vous souhaitez 🌐' },
            { command: '/start', description: 'démarrage du bot' },
            { command: '/getid', description: 'Obtenez votre ID Telegram' },
            { command: '/imgbb', description: 'transforme les photos en lien' },
       
        ];

        let message = '📜 **Liste des commandes disponibles :**\n\n';
        commands.forEach(cmd => {
            message += `╭─❍𝘀𝗽𝗶𝗿𝗶𝘁𝘆🪄\n│ ✧${cmd.command} \n│- ${cmd.description}\n╰─━━━━━━━━━━━━━╾─🤖\n`;
        });

        ctx.replyWithMarkdown(message);
    });
};

