# 🍓 PHÉNIX GUY — Bot WhatsApp personnel

Bot expérimental pour Termux/Android, avec menu texte stylé, préfixe `🍓`, outils de texte, stickers depuis image citée et quelques commandes de modération.

## Important avant de commencer

- Cette version utilise Baileys, une bibliothèque non officielle qui se connecte via WhatsApp Web. Elle n'est pas l'API officielle de WhatsApp et peut cesser de fonctionner après des changements de WhatsApp. L'utilisation peut comporter un risque pour le compte.
- Teste d'abord avec un compte que tu contrôles, respecte les conditions de WhatsApp et évite le spam.
- Le menu convertit `assets/menu.svg` en image JPEG et l'envoie avec la liste des commandes en légende.
- Le projet expose exactement 150 commandes dans son registre, mais certaines sont des aides informatives ou des fonctions de base et ne déclenchent pas une action avancée. Les commandes non disponibles ne doivent pas être considérées comme implémentées.
- Les commandes de modération exigent que le bot soit administrateur. Le propriétaire se configure avec `OWNER_NUMBER`.

## 1. Installer dans Termux

Ouvre Termux et exécute ces lignes une par une :

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts git nano -y
node -v
npm -v
```

Déplace le dossier du projet dans le stockage Termux, puis ouvre-le. Exemple si tu l'as placé dans Downloads :

```bash
termux-setup-storage
cd ~/storage/downloads/phenix-guy-whatsapp-bot
npm install
```

Si tu as décompressé le ZIP ailleurs, adapte le chemin `cd`.

## 2. Configurer le propriétaire et la chaîne

Crée un fichier `.env` n'est pas requis par cette version. Dans Termux, définis les valeurs avant de lancer :

```bash
export OWNER_NUMBER="242XXXXXXXXX"
export CHANNEL_URL="https://whatsapp.com/channel/TON_LIEN"
npm start
```

Remplace `242XXXXXXXXX` par ton numéro WhatsApp avec indicatif international, sans `+`, espaces ni tirets. Remplace le lien de chaîne par le tien.

## 3. Associer WhatsApp

1. Lance `npm start`.
2. Le QR s'affiche dans Termux.
3. Sur WhatsApp, ouvre **Paramètres > Appareils connectés > Connecter un appareil**.
4. Scanne le QR affiché sur l'écran Termux.
5. Attends le message indiquant que PHÉNIX GUY est connecté.
6. Envoie `🍓menu` au compte connecté depuis un autre chat pour tester.

Ne partage jamais le QR ni le dossier `auth_info`. Ce dossier contient la session de connexion.

## 4. Commandes

Préfixe : `🍓`

Exemples :
- `🍓menu`
- `🍓ping`
- `🍓bold bonjour`
- `🍓frame PHÉNIX GUY`
- `🍓sticker` en répondant à une image
- `🍓groupinfo`
- `🍓linkgroup`
- `🍓kick` en répondant au message d'un membre ou en le mentionnant

Les actions d'administration ne fonctionnent que dans un groupe où le bot est administrateur. Certaines commandes sont des aides ou des exemples, pas des automatisations complètes.

## 5. Sauvegarder sur GitHub

1. Crée un dépôt GitHub privé au début.
2. Téléverse les fichiers du projet, mais **jamais** le dossier `auth_info`, `node_modules`, ni des QR/session.
3. Ajoute un fichier `.gitignore` contenant :

```gitignore
node_modules/
auth_info/
.env
*.log
```

Si tu utilises Git dans Termux, depuis le dossier du projet :

```bash
git init
git add package.json index.js README.md .gitignore assets/
git commit -m "Initial PHENIX GUY bot"
git branch -M main
git remote add origin https://github.com/kingkayseur-oss/phenix-guy-whatsapp-bot.git
git push -u origin main
```

Remplace le lien par celui de ton dépôt. GitHub peut demander une authentification. N'utilise jamais ton mot de passe GitHub dans un script.

## 6. Arrêter et relancer

- Arrêter : `Ctrl + C` dans Termux.
- Relancer : reviens dans le dossier du projet et lance `npm start`.
- Ne supprime pas `auth_info` sauf si tu veux volontairement associer à nouveau l'appareil.

## Limites de cette première version

Cette base n'est pas un hébergement 24 h/24 : Android peut arrêter Termux en arrière-plan. Plusieurs commandes avancées (par exemple téléchargement de médias, système de sanctions avec compteur persistant, anti-lien automatique et envoi de rappels planifiés) nécessitent encore du développement. N'expose pas le bot au public avant d'avoir testé chaque commande et sécurisé les permissions.
