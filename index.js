const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { discordToken, channelId, fileName } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let questions = [];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    fs.promises.readFile(`./${fileName}`, 'utf8').then((data) => {
        questions = data.split('\n');
        postQuestion();
        setInterval(() => {
            postQuestion();
        }, 1000 * 60 * 60 * 4);
    });
});

function postQuestion() {
    let randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
    let channel = client.channels.cache.get(channelId);
    channel.send(randomQuestion);
}

client.login(discordToken);
