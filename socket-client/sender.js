const io = require('socket.io-client');

const ioClient = io.connect('http://localhost:4200');
let i = 1;
setInterval(() => {
    console.log('send to on-crud-order-event#' + i);
    ioClient.emit('on-crud-order-event', {
        payload: 123
    });
    i++;
}, 2500);