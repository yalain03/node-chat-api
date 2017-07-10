var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'yves@example.com',
    //     text: 'Hey mon gars. On dit rien man. Et chez toi?',
    //     createdAt: new Date()
    // });  

    // socket.emit('createMessage', {
    //     from: 'user-x@example.com',
    //     text: 'This is to greet everyone in this room'
    // });  
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

// socket.on('newMessage', function(message) {
//     console.log('New message');
//     console.log(message);
// });

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
});

socket.on('newMessage', function(message) {
    console.log(message);
});

// socket.emit('createMessage', {
//     from: 'Junior',
//     text: 'Hey, what is up?'
// }, function(data) {
//     console.log('Got it!', data);
// });


$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

