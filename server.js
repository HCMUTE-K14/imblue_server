const App = require('./src/main/app');
const DB = require('./src/main/db');
const Log = require('./src/main/log')('Server');
const Mongoose = require('mongoose');

const Beverage = require('./src/main/model/beverage.model');
const Order = require('./src/main/model/order.model');

App.listen(App.get('port'), () => {
    Log.wtf(`Application run at port ${App.get('port')}`);
    DB.openConnect();
});

