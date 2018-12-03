const io = require('socket.io-client');

const ioClient = io.connect('http://localhost:4200');

setInterval(() => {
    console.log('send to on-crud-order-event');
    ioClient.emit('on-crud-order-event', {
        payload: 123
    });
}, 1000);