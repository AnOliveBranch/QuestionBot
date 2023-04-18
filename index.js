const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const {
    discordToken,
    channelId,
    fileName1,
    fileName2
} = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let questions1;
let questions2;
let questions;
let channel;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    channel = client.channels.cache.get(channelId);
    fs.promises.readFile(`./${fileName1}`, 'utf8').then((data) => {
        questions1 = data.split('\n');
        fs.promises.readFile(`./${fileName2}`, 'utf8').then((otherData) => {
            questions2 = otherData.split('\n');
            questions = questions1.concat(questions2);
            postQuestion();
            setInterval(() => {
                postQuestion();
            }, 1000 * 60 * 60 * 4);
        });
    });
});

function postQuestion() {
    let randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
    channel.send(randomQuestion);
}

client.login(discordToken);
