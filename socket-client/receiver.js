const io = require('socket.io-client');

const ioClient = io.connect('http://localhost:4200');
let i = 1;
ioClient.on('on-notify-change-order-event', (data) => {
    console.log(JSON.stringify(data) + "#" + i);
    if (data.method === 'NEED_RELOAD_ORDER') {
        console.log('send request REST API to reload data');
    }
    i++;
});