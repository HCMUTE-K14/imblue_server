const SocketIO = require('socket.io');
const RegisterIO = require('./io.register');
const Log = require('../log')('Socket io');
const Config = require('../config');
//	Service
const OrderServiceIO = require('../service/io/order.io.service');

const SocketServer = SocketIO(Config.socket_port);

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';

SocketServer.start = () => {
    Log.info('Start Socket Server on ' + Config.socket_port);
	RegisterIO.register(OrderServiceIO);

    SocketServer.on(CONNECTION, (socket) => {
    	RegisterIO.apply(socket);

        socket.on(DISCONNECT, () => {
            RegisterIO.destroy();
        });
    });
}

module.exports = SocketServer;