const io = require('socket.io-client');

const ioClient = io.connect('http://localhost:4200');

ioClient.on('on-notify-change-order-event', (data) => {
    console.log('receive ' + JSON.stringify(data));
    if (data.method === 'NEED_RELOAD_ORDER') {
        console.log('send request REST API to reload data');
    }
});