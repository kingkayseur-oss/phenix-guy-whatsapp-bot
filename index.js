import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREFIX = "🍓";
const BOT_NAME = "𝑷𝑯𝑬𝑵𝑰𝑿 𝑮𝑼𝒀 𝑽1️⃣";
const CREATOR = "𝑴𝑹 𝑲𝑰𝑵𝑮 𝑲𝑨𝒀𝑺𝑬𝑼𝑹 𝑻𝑯𝑬 𝑮𝑳𝑰𝑻𝑪𝑯 𝑫𝑬𝑽 👨‍💻";
const CHANNEL_URL = process.env.CHANNEL_URL || "https://whatsapp.com/channel/0029Vb8cfQn8V0te5K0atc1s";
const OWNER_NUMBER = (process.env.OWNER_NUMBER || "").replace(/\D/g, "");
const MENU_IMAGE = path.join(__dirname, "assets", "menu.jpg");
const AUTH_DIR = path.join(__dirname, "auth_info");
const logger = pino({ level: "silent" });

const commandRows = [
["menu","Afficher le menu avec image"],["help","Aide du bot"],["ping","Tester la réponse"],["alive","Vérifier que le bot fonctionne"],["info","Informations du bot"],["owner","Contacter le créateur"],["channel","Ouvrir la chaîne WhatsApp"],["prefix","Afficher le préfixe"],["time","Heure actuelle"],["date","Date du jour"],
["sticker","Créer un sticker depuis une image citée"],["toimg","Convertir un sticker en image"],["quote","Créer une citation simple"],["say","Faire répéter un texte"],["echo","Répéter un texte"],["reverse","Inverser un texte"],["upper","Texte en majuscules"],["lower","Texte en minuscules"],["title","Mettre la première lettre des mots en majuscule"],["length","Compter les caractères"],
["bold","Texte gras Unicode"],["italic","Texte italique Unicode"],["mono","Texte monospace Unicode"],["bubble","Texte entouré de cercles"],["small","Texte petit Unicode"],["flip","Retourner quelques caractères"],["clap","Ajouter des applaudissements entre les mots"],["emojify","Ajouter des emojis"],["choose","Choisir parmi des options séparées par |"],["roll","Lancer un dé"],
["coin","Pile ou face"],["8ball","Réponse aléatoire"],["joke","Blague légère"],["fact","Fait amusant"],["compliment","Compliment aléatoire"],["motivate","Message motivant"],["riddle","Énigme"],["rps","Pierre-papier-ciseaux"],["number","Nombre aléatoire"],["countdown","Compte à rebours informatif"],
["calc","Calculatrice simple"],["uuid","Créer un identifiant aléatoire"],["password","Générer un mot de passe local"],["base64","Encoder du texte en Base64"],["unbase64","Décoder du Base64"],["binary","Convertir texte en binaire"],["unbinary","Convertir binaire en texte"],["hex","Texte vers hexadécimal"],["unhex","Hexadécimal vers texte"],["urlencode","Encoder pour URL"],
["urldecode","Décoder une URL"],["charcount","Compter les caractères"],["wordcount","Compter les mots"],["linecount","Compter les lignes"],["trim","Retirer les espaces en bordure"],["dedupe","Retirer les mots répétés"],["sort","Trier les éléments séparés par |"],["shuffle","Mélanger les éléments séparés par |"],["repeat","Répéter un texte"],["timestamp","Afficher le timestamp"],
["weatherhelp","Conseils pour consulter la météo"],["translatehelp","Aide pour traduire un texte"],["wikihelp","Aide pour rechercher une encyclopédie"],["qrhelp","Aide pour créer un QR code"],["poll","Créer un mini-sondage textuel"],["remind","Créer un rappel textuel à copier"],["note","Créer une note dans le chat"],["todo","Créer une liste de tâches"],["clearhelp","Aide pour effacer les messages manuellement"],["support","Aide et support"],
["groupinfo","Informations du groupe"],["admins","Lister les administrateurs"],["members","Nombre de membres"],["rules","Afficher les règles du groupe"],["tagall","Mentionner les membres (à utiliser avec respect)"],["hidetag","Message avec mentions discrètes"],["linkgroup","Lien d'invitation du groupe"],["revoke","Réinitialiser le lien du groupe"],["groupopen","Autoriser tous les membres à écrire"],["groupclose","Réserver l'envoi aux admins"],
["kick","Retirer un membre"],["add","Ajouter un membre (si WhatsApp l'autorise)"],["promote","Promouvoir un membre admin"],["demote","Retirer le statut admin"],["warn","Avertissement textuel"],["mute","Fermer le groupe aux membres"],["unmute","Rouvrir le groupe"],["antilink","Afficher les conseils anti-lien"],["antispam","Afficher les conseils anti-spam"],["welcome","Afficher les conseils de bienvenue"],
["goodbye","Afficher les conseils de départ"],["setsubject","Modifier le nom du groupe"],["setdesc","Modifier la description du groupe"],["tagadmins","Mentionner les admins"],["everyone","Mentionner les membres avec prudence"],["pollgroup","Créer un sondage de groupe textuel"],["grouphelp","Aide de modération"],["myrole","Afficher ton rôle dans le groupe"],["jid","Afficher l'identifiant du chat"],["id","Afficher l'identifiant du chat"],
["cat","Emoji chat"],["dog","Emoji chien"],["heart","Cœurs"],["hug","Câlin amical en emoji"],["pat","Tapotement amical en emoji"],["slap","GIF/emoji humoristique non violent"],["ship","Score d'amitié aléatoire"],["rate","Note aléatoire humoristique"],["simp","Réponse humoristique"],["cool","Phrase stylée"],
["anime","Phrase anime aléatoire"],["motivation","Motivation"],["truth","Question vérité"],["dare","Défi amusant sans danger"],["wyr","Tu préfères"],["riddle2","Autre énigme"],["quiz","Question quiz"],["answer","Réponse de quiz libre"],["daily","Message du jour"],["fortune","Fortune humoristique"],
["profile","Créer une fiche textuelle"],["nickname","Proposer un surnom"],["bio","Créer une bio stylée"],["quote2","Citation positive"],["status","Idée de statut WhatsApp"],["storyidea","Idée de statut"],["caption","Légende pour photo"],["hashtag","Suggestions de hashtags"],["welcomeText","Texte de bienvenue"],["goodbyeText","Texte d'au revoir"],
["rulesText","Modèle de règles"],["announce","Préparer une annonce textuelle"],["groupnamehelp","Aide pour nommer un groupe"],["groupdescHelp","Aide pour description de groupe"],["adminhelp","Rappels pour admins"],["privacy","Conseils de confidentialité"],["safety","Conseils de sécurité"],["backup","Conseils de sauvegarde"],["github","Infos du dépôt GitHub"],["version","Version du projet"],
["creator","Nom du créateur"],["credits","Crédits du bot"],["feedback","Préparer un retour"],["report","Préparer un signalement"],["bug","Conseils pour signaler un bug"],["donate","Informations de soutien"],["language","Langues disponibles"],["terms","Règles d'utilisation"],["about","À propos du bot"],["restarthelp","Comment redémarrer Termux"],
["list1","Liste d'exemple 1"],["list2","Liste d'exemple 2"],["list3","Liste d'exemple 3"],["list4","Liste d'exemple 4"],["list5","Liste d'exemple 5"],["emoji","Afficher des emojis"],["emojilist","Liste d'emojis"],["symbols","Symboles décoratifs"],["decor","Décorer un texte"],["frame","Encadrer un texte"],["unframe","Retirer un encadrement simple"],["dateformat","Date au format long"],["stopwatchhelp","Aide chronomètre"],["randomcolor","Couleur hexadécimale aléatoire"],["mathhelp","Aide calculatrice"],["texthelp","Aide des commandes de texte"],["mediahelp","Aide des médias"],["admincommands","Liste des commandes admin"],["allcommands","Lister les 150 commandes"],["purge","Retirer tout les membres"]
];

const commands = new Map(commandRows.slice(0, 150).map(([name, description]) => [name, description]));
const actualCount = commands.size;
const groupOnly = new Set(["groupinfo","admins","members","rules","tagall","hidetag","linkgroup","revoke","groupopen","groupclose","kick","kickall","add","promote","demote","mute","unmute","setsubject","setdesc","tagadmins","everyone","myrole","jid","id","purge"]);
const adminOnly = new Set(["revoke","groupopen","groupclose","kick","add","promote","demote","mute","unmute","setsubject","setdesc"]);
const fun = arr => arr[Math.floor(Math.random()*arr.length)];
const getText = msg => {
  const m = msg.message || {};
  return m.conversation || m.extendedTextMessage?.text || m.imageMessage?.caption || m.videoMessage?.caption || m.documentMessage?.caption || "";
};
const senderNumber = jid => (jid || "").split("@")[0].split(":")[0];
const isGroup = jid => (jid || "").endsWith("@g.us");
const quoted = msg => msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const quotedParticipant = msg => msg.message?.extendedTextMessage?.contextInfo?.participant;
const getTarget = (msg, args) => {
  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  const mentioned = ctx?.mentionedJid?.[0];
  const quotedJid = ctx?.participant;
  const typed = args[0] ? args[0].replace(/[^0-9]/g, "") : "";
  return mentioned || quotedJid || (typed ? `${typed}@s.whatsapp.net` : null);
};
const menuText = () => {
  const groups = [
    ["👑 GÉNÉRAL", ["menu","help","ping","alive","info","owner","channel","prefix","time","date"]],
    ["🎨 MÉDIAS & TEXTE", ["sticker","toimg","quote","say","echo","reverse","upper","lower","title","length","bold","italic","mono","bubble","small","flip","clap","emojify"]],
    ["🧰 OUTILS", ["calc","uuid","password","base64","unbase64","binary","unbinary","hex","unhex","urlencode","urldecode","wordcount","linecount","trim","sort","shuffle"]],
    ["🎮 FUN", ["choose","roll","coin","8ball","joke","fact","compliment","motivate","riddle","rps","number","cat","dog","heart","hug","ship","rate","anime","truth","dare","wyr","quiz","daily","fortune"]],
    ["👥 GROUPES", ["groupinfo","admins","members","rules","tagall","hidetag","linkgroup","revoke","groupopen","groupclose","kick","add","promote","demote","warn","mute","unmute","antilink","antispam","welcome","goodbye","setsubject","setdesc","tagadmins","grouphelp","myrole"]],
    ["🛡️ AIDE & DIVERS", ["profile","nickname","bio","status","caption","hashtag","announce","privacy","safety","backup","github","version","creator","credits","feedback","report","terms","about","emoji","symbols","decor","frame","allcommands"]]
  ];
  let out = `╭━━━〔 🍓 *${BOT_NAME}* 〕━━━╮\n`;
  out += `┃ 👑 Créateur : ${CREATOR}\n┃ ⚙️ Préfixe : ${PREFIX}\n┃ 📚 Commandes disponibles : ${actualCount}\n╰━━━━━━━━━━━━━━━━━━╯\n\n`;
  for (const [title, names] of groups) {
    out += `╭─『 ${title} 』\n`;
    out += names.map(n => `│ ${PREFIX}${n}`).join("\n") + "\n╰───────────────\n\n";
  }
  out += `🔗 *VOIR MA CHAÎNE* : ${CHANNEL_URL}\n`;
  out += `© ${BOT_NAME} • ${CREATOR}`;
  return out;
};
const sendText = (sock, jid, text, quotedMsg) => sock.sendMessage(jid, { text }, quotedMsg ? { quoted: quotedMsg } : {});
const helpText = name => `🍓 *${name}*\n${commands.get(name) || "Commande disponible"}\n\nExemple : ${PREFIX}${name}`;

async function handleCommand(sock, msg, chatId, sender, body, isOwner, isAdmin, botIsAdmin) {
  const parts = body.trim().split(/\s+/);
  const command = parts[0].slice(PREFIX.length).toLowerCase();
  const args = parts.slice(1);
  const text = args.join(" ");
  if (!commands.has(command)) return;
  if (groupOnly.has(command) && !isGroup(chatId)) return sendText(sock, chatId, "⚠️ Cette commande fonctionne seulement dans un groupe.", msg);
  if (adminOnly.has(command) && !(isOwner || isAdmin)) return sendText(sock, chatId, "⛔ Réservé aux administrateurs du groupe.", msg);
  if (adminOnly.has(command) && !botIsAdmin) return sendText(sock, chatId, "⚠️ Le bot doit être administrateur pour cette action.", msg);

  const simple = {
    ping: () => "🏓 Pong ! PHÉNIX GUY est actif.",
    alive: () => `✅ *${BOT_NAME}* est en ligne.\n👑 ${CREATOR}`,
    info: () => `╭━━〔 🍓 ${BOT_NAME} 〕━━╮\n┃ Préfixe : ${PREFIX}\n┃ Commandes : ${actualCount}\n┃ Mode : personnel\n╰━━━━━━━━━━━━━━╯`,
    owner: () => `👑 Créateur : ${CREATOR}\nNuméro configuré : ${OWNER_NUMBER ? "+"+OWNER_NUMBER : "à configurer dans .env"}`,
    channel: () => `📣 *Ma chaîne WhatsApp*\n${CHANNEL_URL}`,
    prefix: () => `⚙️ Préfixe actuel : ${PREFIX}`,
    time: () => `🕒 ${new Date().toLocaleTimeString("fr-FR")}`,
    date: () => `📅 ${new Date().toLocaleDateString("fr-FR", { dateStyle:"full" })}`,
    quote: () => `💬 « ${text || "Chaque jour est une nouvelle occasion d'avancer."} »`,
    say: () => text || "Écris un texte après la commande.",
    echo: () => text || "Écris un texte après la commande.",
    reverse: () => [...text].reverse().join("") || "Écris un texte après la commande.",
    upper: () => text.toUpperCase() || "Écris un texte après la commande.",
    lower: () => text.toLowerCase() || "Écris un texte après la commande.",
    title: () => text.replace(/\b\p{L}/gu, c=>c.toUpperCase()) || "Écris un texte après la commande.",
    length: () => `🔢 Nombre de caractères : ${text.length}`,
    charcount: () => `🔢 Nombre de caractères : ${text.length}`,
    wordcount: () => `🔤 Nombre de mots : ${(text.match(/\S+/g)||[]).length}`,
    linecount: () => `📄 Nombre de lignes : ${text ? text.split(/\n/).length : 0}`,
    trim: () => text.trim(),
    bold: () => [...text].map(c => {const n=c.codePointAt(0); return n>=65&&n<=90?String.fromCodePoint(0x1D400+n-65):n>=97&&n<=122?String.fromCodePoint(0x1D41A+n-97):c}).join("") || "Écris un texte.",
    italic: () => [...text].map(c => {const n=c.codePointAt(0); return n>=65&&n<=90?String.fromCodePoint(0x1D434+n-65):n>=97&&n<=122?String.fromCodePoint(0x1D44E+n-97):c}).join("") || "Écris un texte.",
    mono: () => [...text].map(c => {const n=c.codePointAt(0); return n>=65&&n<=90?String.fromCodePoint(0x1D670+n-65):n>=97&&n<=122?String.fromCodePoint(0x1D68A+n-97):c}).join("") || "Écris un texte.",
    bubble: () => [...text].map(c=>/[a-z]/i.test(c)?String.fromCodePoint((c.toLowerCase().charCodeAt(0)-97)+0x24D0):c).join("") || "Écris un texte.",
    flip: () => text.split("").reverse().join("") || "Écris un texte.",
    clap: () => text.split(/\s+/).filter(Boolean).join(" 👏 ") || "Écris un texte.",
    emojify: () => `✨ ${text} ✨`,
    choose: () => {const a=text.split("|").map(s=>s.trim()).filter(Boolean);return a.length?`🎯 Je choisis : ${fun(a)}`:"Utilise : 🍓choose pizza|tacos|burger";},
    roll: () => `🎲 Résultat : ${1+Math.floor(Math.random()*6)}`,
    coin: () => `🪙 ${fun(["Pile","Face"])}`,
    "8ball": () => `🎱 ${fun(["Oui !","Non.","Peut-être.","Réessaie plus tard.","C'est très probable.","Je ne peux pas le prédire."])}`,
    joke: () => `😂 ${fun(["Pourquoi les développeurs aiment le noir ? Parce que la lumière attire les bugs !","Un bot entre dans un groupe… il demande le rôle admin avant de dire bonjour.","Pourquoi le téléphone est calme ? Il a mis les notifications en silencieux."])}`,
    fact: () => `🧠 ${fun(["Les pieuvres ont trois cœurs.","Une journée sur Vénus est plus longue que son année.","Les abeilles communiquent notamment par une danse."])}`,
    compliment: () => `🌟 ${fun(["Tu as de bonnes idées !","Continue à apprendre, tes efforts comptent.","Ton originalité fait la différence."])}`,
    motivate: () => "🔥 Avance à ton rythme, apprends une chose à la fois et n'abandonne pas tes projets.",
    riddle: () => "🧩 Qu'est-ce qui a des touches mais n'ouvre aucune porte ? Réponse : un clavier.",
    riddle2: () => "🧩 Qu'est-ce qui monte mais ne redescend jamais ? Réponse : l'âge.",
    rps: () => `✊ Je joue : ${fun(["pierre","papier","ciseaux"])}. Relance pour rejouer !`,
    number: () => `🎯 Nombre aléatoire : ${1+Math.floor(Math.random()*100)}`,
    cat: () => "🐈 Miaou ! 🐾",
    dog: () => "🐕 Wouf ! 🐾",
    heart: () => "💜 💙 💚 💛 🧡 ❤️",
    hug: () => "🫂🤍 Envoi d'un câlin amical !",
    pat: () => "🫳🐾 *tap tap*",
    slap: () => "🤚💨 *bonk cartoon* — humour uniquement !",
    ship: () => `💞 Score d'amitié aléatoire : ${Math.floor(Math.random()*101)}%`,
    rate: () => `⭐ Note humoristique : ${Math.floor(Math.random()*11)}/10`,
    simp: () => "😎 Respect, gentillesse et consentement avant tout.",
    cool: () => `🕶️ ${text || "Calme, classe et concentré."}`,
    anime: () => `⚔️ ${fun(["Entraîne-toi et dépasse tes limites !","Même un héros commence par apprendre.","La vraie force, c'est aussi protéger les autres."])}`,
    truth: () => `❓ ${fun(["Quel talent aimerais-tu apprendre ?","Quel est ton meilleur souvenir récent ?","Quel objectif veux-tu atteindre cette année ?"])}`,
    dare: () => `🎯 Défi sans danger : complimente sincèrement un ami.`,
    wyr: () => `🤔 ${fun(["Tu préfères voyager dans le passé ou le futur ?","Tu préfères maîtriser toutes les langues ou tous les instruments ?","Tu préfères vivre près de la mer ou en montagne ?"])}`,
    quiz: () => `🧠 Quiz : quelle planète est surnommée la planète rouge ? Réponds avec 🍓answer Mars`,
    answer: () => text.toLowerCase().includes("mars") ? "✅ Bonne réponse !" : "📝 Réponse enregistrée. Essaie encore : quelle planète est surnommée la planète rouge ?",
    daily: () => "☀️ Petit rappel : sois curieux, prudent et régulier dans tes efforts.",
    fortune: () => `🔮 Aujourd'hui, une petite étape peut te rapprocher d'un grand objectif.`,
    uuid: () => `🆔 ${crypto.randomUUID()}`,
    password: () => `🔐 Mot de passe généré localement : ${Array.from(crypto.getRandomValues(new Uint8Array(14)), b=>"ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#"[b%64]).join("")}\nNe l'envoie à personne et conserve-le en lieu sûr.`,
    base64: () => Buffer.from(text,"utf8").toString("base64"),
    unbase64: () => {try{return Buffer.from(text,"base64").toString("utf8")}catch{return "Base64 invalide."}},
    binary: () => [...text].map(c=>c.codePointAt(0).toString(2).padStart(8,"0")).join(" "),
    unbinary: () => {try{return text.split(/\s+/).map(b=>String.fromCodePoint(parseInt(b,2))).join("")}catch{return "Binaire invalide."}},
    hex: () => Buffer.from(text,"utf8").toString("hex"),
    unhex: () => {try{return Buffer.from(text,"hex").toString("utf8")}catch{return "Hex invalide."}},
    urlencode: () => encodeURIComponent(text),
    urldecode: () => {try{return decodeURIComponent(text)}catch{return "URL invalide."}},
    sort: () => text.split("|").map(s=>s.trim()).filter(Boolean).sort((a,b)=>a.localeCompare(b)).join("\n"),
    shuffle: () => text.split("|").map(s=>s.trim()).filter(Boolean).sort(()=>Math.random()-.5).join(" | "),
    repeat: () => {const n=Math.max(1,Math.min(10,parseInt(args[0],10)||1));return Array(n).fill(args.slice(1).join(" ")||"").join("\n")||"Exemple : 🍓repeat 3 Bonjour";},
    timestamp: () => `⏱️ ${Date.now()}`,
    frame: () => `╭───〔 ✦ 〕───╮\n${text || "Ton texte"}\n╰────────────╯`,
    unframe: () => text.replace(/[╭╮╰╯─━〔〕│]/g,"").trim(),
    decor: () => `꧁༺ ${text || "PHÉNIX GUY"} ༻꧂`,
    symbols: () => "♛ ✦ ✧ ♔ ♕ ⚡ ❖ ⟡ 𖤐 ꧁ ꧂ 『 』",
    emoji: () => "🍓 👑 🔥 ⚡ 💜 🖤 ✨ 🤖 🕷️ 🎯",
    emojilist: () => "😀 😎 😂 🥳 ❤️ 💜 🔥 ⚡ 🌟 🎮 🤖 🍓 👑",
    randomcolor: () => `🎨 #${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0").toUpperCase()}`,
    version: () => "📦 PHÉNIX GUY v1.0.0 — projet personnel",
    creator: () => `👑 ${CREATOR}`,
    credits: () => "Créé avec Node.js, Termux et la bibliothèque Baileys. Utilise ce bot de façon responsable.",
    about: () => `🍓 ${BOT_NAME} : bot WhatsApp personnel avec commandes utiles et outils de groupe.`,
    terms: () => "Utilise le bot avec respect. Évite le spam, respecte la vie privée et vérifie les autorisations avant de modérer.",
    privacy: () => "🔒 Ne partage jamais ton QR de connexion, le dossier auth_info, tes mots de passe ou tes jetons.",
    safety: () => "🛡️ Garde le bot privé au départ, limite les droits admin et ne lance que du code que tu comprends.",
    github: () => "📦 Ajoute ce dossier à ton propre dépôt GitHub. Ne publie jamais auth_info.",
    support: () => "🆘 Vérifie le README et les messages d'erreur Termux. En cas de problème, partage seulement le texte de l'erreur, jamais les identifiants.",
    feedback: () => `✍️ Envoie ton retour au créateur : ${CREATOR}`,
    report: () => "📝 Décris le problème, l'heure et la commande concernée. N'inclus pas de données privées.",
    bug: () => "🐞 Pour signaler un bug : copie le message d'erreur sans numéro privé, QR ni informations de session.",
    language: () => "🌐 Les réponses principales sont en français.",
    restarthelp: () => "Dans Termux, reviens au dossier du bot et lance : npm start",
    list1: () => "📌 Liste : apprendre • créer • tester • améliorer",
    list2: () => "📌 Liste : idées • projets • objectifs • progrès",
    list3: () => "📌 Liste : respect • sécurité • confidentialité • entraide",
    list4: () => "📌 Liste : texte • emoji • jeux • outils",
    list5: () => "📌 Liste : vérifier • sauvegarder • documenter • partager",
    profile: () => `╭─〔 PROFIL 〕─╮\nNom : ${text || senderNumber(sender)}\nBot : ${BOT_NAME}\n╰──────────╯`,
    nickname: () => `✨ Surnom proposé : ${fun(["Shadow","Nova","Phénix","Glitch","Éclipse","Nébula"])}`,
    bio: () => `꧁༺ ${text || "Calme • Royal • Créatif"} ༻꧂`,
    status: () => `📱 Idée de statut : ${fun(["Je construis mes rêves, étape par étape.","Moins de bruit, plus de résultats.","Créativité, respect et ambition."])}`,
    caption: () => `📸 ${text || "Un instant, un souvenir, une histoire."}`,
    hashtag: () => "#PhenixGuy #WhatsAppBot #GlitchDev #Créativité",
    announce: () => `📣 *ANNONCE*\n${text || "Écris ton annonce après la commande."}`,
    welcomeText: () => `👋 Bienvenue dans le groupe ! Lis les règles et respecte tout le monde.`,
    goodbyeText: () => "👋 Bonne continuation et prends soin de toi !",
    rulesText: () => "📜 RÈGLES\n1. Respect mutuel\n2. Pas de spam\n3. Respect de la vie privée\n4. Suivre les consignes des admins",
    groupnamehelp: () => "Utilise un nom clair et respectueux pour le groupe.",
    groupdescHelp: () => "Décris le but du groupe, ses règles et les liens utiles.",
    adminhelp: () => "🛡️ Vérifie les permissions, préviens avant une sanction et applique les règles équitablement.",
    backup: () => "💾 Sauvegarde le code sur GitHub, mais garde auth_info privé et hors du dépôt.",
    weatherhelp: () => "🌦️ Consulte une application météo fiable pour ta ville.",
    translatehelp: () => "🌐 Exemple : copie le texte dans un traducteur fiable et vérifie le contexte.",
    wikihelp: () => "📚 Recherche le sujet dans une encyclopédie fiable et compare les sources.",
    qrhelp: () => "🔳 Utilise un générateur de QR code fiable. Ne transforme pas des liens privés en QR public.",
    poll: () => `📊 *SONDAGE*\n${text || "Question ?\n1. Oui\n2. Non"}`,
    remind: () => `⏰ Rappel à copier dans tes notes : ${text || "Ajoute le texte et l'heure du rappel."}`,
    note: () => `📝 NOTE\n${text || "Écris le contenu de la note."}`,
    todo: () => `☑️ LISTE DE TÂCHES\n${text.split("|").map((x,i)=>`${i+1}. ☐ ${x.trim()}`).join("\n") || "Exemple : 🍓todo devoirs|réviser|sauvegarder le projet"}`,
    clearhelp: () => "🧹 Pour supprimer un message, utilise les options WhatsApp disponibles sur ton appareil.",
    mediahelp: () => "🖼️ Réponds à une image avec 🍓sticker pour créer un sticker. Les médias doivent être compatibles.",
    texthelp: () => `✍️ Exemples : ${PREFIX}bold bonjour • ${PREFIX}reverse bonjour • ${PREFIX}frame mon texte`,
    mathhelp: () => "🧮 La calculatrice sécurisée sera ajoutée dans une prochaine version. N'exécute pas de code inconnu.",
    stopwatchhelp: () => "⏱️ Utilise le chronomètre de ton téléphone pour mesurer une durée.",
    countdown: () => "⏳ Utilise l'horloge de ton téléphone pour un compte à rebours fiable.",
    calc: () => "🧮 Calculatrice simple non activée dans cette version. Utilise la calculatrice de ton téléphone.",
    allcommands: () => menuText(),
    help: () => menuText(),
    menu: () => menuText(),
    admincommands: () => "🛡️ Commandes admin : kick, add, promote, demote, groupopen, groupclose, revoke, setsubject, setdesc.",
    grouphelp: () => "👥 Commandes de groupe : groupinfo, admins, members, rules, tagall, linkgroup, kick, add, promote, demote, groupopen, groupclose.",
    antilink: () => "🛡️ Anti-lien : cette version affiche des conseils seulement; elle ne supprime pas automatiquement les liens.",
    antispam: () => "🛡️ Anti-spam : évite les envois répétés et applique les règles du groupe.",
    welcome: () => "👋 Configure un message de bienvenue dans les réglages du groupe ou ajoute cette fonction plus tard.",
    goodbye: () => "👋 Le message de départ automatique n'est pas activé dans cette version.",
    warn: () => `⚠️ Avertissement demandé pour ${text || "un membre"}. Aucune sanction automatique n'est appliquée par cette commande.`,
    tagall: () => "⚠️ Mention collective non activée pour éviter les notifications massives. Utilise une annonce claire.",
    hidetag: () => "⚠️ Les mentions discrètes ne sont pas activées dans cette version.",
    everyone: () => "⚠️ La mention de tous les membres n'est pas activée pour éviter le spam.",
    tagadmins: () => "ℹ️ Utilise 🍓admins pour voir les administrateurs."
  };

  if (command === "sticker") {
    const q = quoted(msg);
    if (!q?.imageMessage && !q?.videoMessage) return sendText(sock, chatId, "Réponds à une image ou à une courte vidéo avec 🍓sticker.", msg);
    try {
      const buffer = await downloadMediaMessage({ key: { remoteJid: chatId, id: msg.message?.extendedTextMessage?.contextInfo?.stanzaId, participant: quotedParticipant(msg) }, message: q }, "buffer", {});
      const webp = await sharp(buffer, { animated: false }).resize(512,512,{fit:"contain",background:{r:0,g:0,b:0,alpha:0}}).webp().toBuffer();
      return sock.sendMessage(chatId, { sticker: webp }, { quoted: msg });
    } catch (e) {
      return sendText(sock, chatId, "⚠️ Impossible de créer le sticker depuis ce média. Essaie avec une image plus petite.", msg);
    }
  }
  if (command === "toimg") return sendText(sock, chatId, "ℹ️ La conversion sticker vers image n'est pas encore activée. Tu peux utiliser un convertisseur WebP fiable.", msg);

  if (command === "groupinfo") {
    const meta = await sock.groupMetadata(chatId);
    return sendText(sock, chatId, `╭─〔 👥 GROUPE 〕─╮\nNom : ${meta.subject}\nMembres : ${meta.participants.length}\nCréé : ${meta.creation ? new Date(meta.creation*1000).toLocaleDateString("fr-FR") : "non disponible"}\n╰──────────────╯`, msg);
  }
  if (command === "admins" || command === "tagadmins") {
    const meta = await sock.groupMetadata(chatId);
    const admins = meta.participants.filter(p=>p.admin).map(p=>p.id);
    return sock.sendMessage(chatId, { text: `👑 Administrateurs (${admins.length})\n${admins.map(x=>"• @"+senderNumber(x)).join("\n")}`, mentions: admins }, { quoted: msg });
  }
  if (command === "members") {
    const meta = await sock.groupMetadata(chatId);
    return sendText(sock, chatId, `👥 Membres : ${meta.participants.length}`, msg);
  }
  if (command === "rules") return sendText(sock, chatId, "📜 Règles : respect, pas de spam, protection de la vie privée et respect des admins.", msg);
  if (command === "jid" || command === "id") return sendText(sock, chatId, `🆔 Chat ID : ${chatId}\n👤 Expéditeur : ${sender}`, msg);
  if (command === "myrole") return sendText(sock, chatId, `👤 Ton identifiant : ${sender}\nℹ️ Demande à un admin de confirmer ton rôle.`, msg);
  if (command === "linkgroup") {
    const code = await sock.groupInviteCode(chatId);
    return sendText(sock, chatId, `🔗 Lien d'invitation : https://chat.whatsapp.com/${code}`, msg);
  }
  if (command === "revoke") {
    await sock.groupRevokeInvite(chatId);
    return sendText(sock, chatId, "🔄 Le lien d'invitation a été réinitialisé.", msg);
  }
  if (command === "groupopen" || command === "unmute") {
    await sock.groupSettingUpdate(chatId, "not_announcement");
    return sendText(sock, chatId, "🔓 Le groupe est ouvert aux messages des membres.", msg);
  }
  if (command === "groupclose" || command === "mute") {
    await sock.groupSettingUpdate(chatId, "announcement");
    return sendText(sock, chatId, "🔒 Seuls les admins peuvent envoyer des messages.", msg);
  }
  if (command === "kick" || command === "add" || command === "promote auto" || command === "demote" || command === "purge") {
    const target = getTarget(msg,args);
    if (!target) return sendText(sock, chatId, `Utilise une mention, réponds au message du membre ou fournis son numéro.`, msg);
    const action = {kick:"remove",add:"add",promote:"promote",demote:"demote"}[command];
    const result = await sock.groupParticipantsUpdate(chatId, [target], action);
    return sendText(sock, chatId, `⚙️ Action ${command} demandée pour @${senderNumber(target)}. Vérifie le résultat WhatsApp.`, msg);
  }
  if (command === "setsubject") {
    if (!text) return sendText(sock, chatId, `Exemple : ${PREFIX}setsubject Nouveau nom`, msg);
    await sock.groupUpdateSubject(chatId, text.slice(0,100));
    return sendText(sock, chatId, "✅ Nom du groupe modifié.", msg);
  }
  if (command === "setdesc") {
    if (!text) return sendText(sock, chatId, `Exemple : ${PREFIX}setdesc Description du groupe`, msg);
    await sock.groupUpdateDescription(chatId, text.slice(0,2048));
    return sendText(sock, chatId, "✅ Description modifiée.", msg);
  }

  if (command === "menu" || command === "allcommands") {
    const caption = menuText();
    try {
      const svgPath = path.join(__dirname, "assets", "menu.svg");
      if (fs.existsSync(svgPath)) {
        const imageBuffer = await sharp(fs.readFileSync(svgPath)).jpeg({ quality: 88 }).toBuffer();
        return sock.sendMessage(chatId, { image: imageBuffer, caption }, { quoted: msg });
      }
    } catch (e) {
      console.error("Menu image non disponible:", e?.message || e);
    }
    return sendText(sock, chatId, caption, msg);
  }
  if (simple[command]) return sendText(sock, chatId, simple[command](), msg);
  return sendText(sock, chatId, helpText(command), msg);
}

async function start() {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  let version;
  try { ({ version } = await fetchLatestBaileysVersion()); } catch {}
  const sock = makeWASocket({
    version, auth: state, logger,
    printQRInTerminal: false,
    browser: ["PHENIX GUY", "Chrome", "1.0.0"],
    markOnlineOnConnect: false,
    syncFullHistory: false
  });
  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("\n📱 Scanne ce QR depuis WhatsApp > Appareils connectés > Connecter un appareil :\n");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") console.log(`✅ ${BOT_NAME} connecté. ${actualCount} commandes enregistrées.`);
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) {
        console.log("Connexion interrompue. Nouvelle tentative dans quelques secondes...");
        setTimeout(start, 5000);
      } else {
        console.log("Session déconnectée. Supprime auth_info uniquement si tu veux associer à nouveau le compte.");
      }
    }
  });
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;
      const chatId = msg.key.remoteJid;
      if (!chatId || chatId === "status@broadcast") continue;
      const body = getText(msg).trim();
      if (!body.startsWith(PREFIX)) continue;
      const sender = msg.key.participant || msg.key.remoteJid;
      const senderDigits = senderNumber(sender);
      const isOwner = Boolean(OWNER_NUMBER && senderDigits === OWNER_NUMBER);
      let isAdmin = false, botIsAdmin = false;
      if (isGroup(chatId)) {
        try {
          const meta = await sock.groupMetadata(chatId);
          const me = sock.user?.id?.split(":")[0] + "@s.whatsapp.net";
          isAdmin = Boolean(meta.participants.find(p => p.id === sender)?.admin) || isOwner;
          botIsAdmin = Boolean(meta.participants.find(p => p.id === me)?.admin);
        } catch {}
      }
      // Personal mode: only owner can use the bot in private chats. In groups, allow commands but restrict admin actions.
      if (!isGroup(chatId) && OWNER_NUMBER && !isOwner) continue;
      try { await handleCommand(sock, msg, chatId, sender, body, isOwner, isAdmin, botIsAdmin); }
      catch (err) { console.error("Commande échouée:", err?.message || err); await sendText(sock, chatId, "*⚠️ Une erreur est survenue. Vérifie que le bot possède les droits nécessaires.*", msg); }
    }
  });
}
start().catch(err => { console.error(err); process.exit(1); });
