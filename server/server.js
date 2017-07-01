const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'louis@example.com',
    //     text: 'Salut dur gar. On dit quoi?',
    //     createdAt: new Date()
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    // method created for receiving 

    // socket.emit('newMessage', {
    //     from: 'server',
    //     to: 'user',
    //     text: 'New message created and emitted', 
    //     createdAt: new Date()
    // });

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

    socket.on('createMessage', function(message, callback) {
        console.log('New message created', message);        
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server');

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });  
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});