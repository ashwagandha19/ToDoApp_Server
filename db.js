const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    password: process.env.USER_PW,
    socket: {
        host: process.env.DATABASE_URI,
        port: 16802
    }
});

client.on('error', (err) => console.log("ERROR WHEN CONNECTING", err))

if(!client.isOpen) {
    client.connect()
}

client.set('name', 'vlad')

module.exports = client;