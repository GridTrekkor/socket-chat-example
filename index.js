"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const io = require("socket.io");
let app = express();
let web = new http.Server(app);
let chat = io(web, { wsEngine: 'ws' });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
chat.on('connection', socket => {
    let clientIP = socket.handshake.address;
    console.log('[' + clientIP + '] connected');
    socket.on('chat message', msg => {
        console.log('[' + clientIP + '] ' + msg);
        chat.emit('chat message', '[' + clientIP + '] ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('[' + clientIP + '] disconnected');
    });
});
chat.emit('some event', { for: 'everyone' });
web.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=index.js.map