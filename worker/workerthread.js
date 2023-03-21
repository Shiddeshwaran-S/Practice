const Worker = require('worker_threads');
const express = require('express');
const app = express();
const http = require('http');

app.get('/', (req, res) => { 
    res.send('Hello World');
    console.log('Hello World');
});

app.get('/worker', (req, res) => {
    const worker = new Worker.Worker('./worker.js');
    worker.on('message', (msg) => {
        res.send(`Total bytes value: ${msg.total}`);
        console.log(msg.data);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const server = http.createServer(app);

module.exports = server;