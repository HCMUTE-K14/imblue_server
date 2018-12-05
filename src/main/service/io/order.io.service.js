const OrderService = require('../order.service');
const Log = require('../../log')('Order IO Service');

const CRUD_ORDER_EVENT = 'on-crud-order-event'; // When create, update, delete orders
const NOTIFY_CHANGE_ORDER_EVENT = 'on-notify-change-order-event';

const NEED_RELOAD_ORDER_METHOD = 'NEED_RELOAD_ORDER';

// FLow:
//	1. Employee create order
//	2. Client send message to CRUD_ORDER_EVENT
//  3. Service receive message on CRUD_ORDER_EVENT, will broadcast message on NOTIFY_CHANGE_ORDER_EVENT
//  4. Client (except Sender) receive message from NOTIFY_CHANGE_ORDER_EVENT, will send REST API to reload data

// {
// 	method: 'CHANGE_ORDER',
// 	payload: orderId
// }
const OrderServiceIO = {};
OrderServiceIO.name = 'OrderServiceIO';

OrderServiceIO.run = (socket) => {
    let ip = socket.request.connection.remoteAddress;
	Log.info('Started#'+ip);

    socket.on(CRUD_ORDER_EVENT, (data) => {
        Log.debug(`on ${CRUD_ORDER_EVENT} with ${JSON.stringify(data)}`);
        socket.broadcast.emit(NOTIFY_CHANGE_ORDER_EVENT, {
            method: NEED_RELOAD_ORDER_METHOD,
            payload: data.orderId
        });
    });

    socket.on(NOTIFY_CHANGE_ORDER_EVENT, (data) => {
        Log.debug(`on ${NOTIFY_CHANGE_ORDER_EVENT} with ${data}`);
    });
}

OrderServiceIO.stop = () => {
	Log.info('Stopped');
}

module.exports = OrderServiceIO;