const Mongoose = require('mongoose');
const Config = require('./config');
const Log = require('./log')('Database');

Mongoose.Promise = global.Promise;

const DbModule = {};

DbModule.healthCheck = healthCheck;
DbModule.openConnect = connect;

module.exports = DbModule;

let NOT_CONNECTED = 0;
let CONNECTED = 1;

function healthCheck() {
    let health = Mongoose.connection.readyState;

    if (health === NOT_CONNECTED) {
        Log.info('DB At Risk');
    } else {
        Log.info('DB is Fine');
    }

    return health;
}

function connect() {
    let url;
    if (!Config.db_username || !Config.db_password) {
        url = `mongodb://${Config.db_host}:${Config.db_port}/${Config.db_name}`;
    } else {
        url = `mongodb://${Config.db_username}:${Config.db_password}@${Config.db_host}:${Config.db_port}/${Config.db_name}`;
    }

    Mongoose.set('useCreateIndex', true)
    Mongoose.connect(url, { useNewUrlParser: true });

    Mongoose.connection
        .on('error', (error) => {
            Log.error(error.message + " with url: " + url);
        })
        .on('connected', () => {
            Log.info("Connected to DB " + url);
        })
        .on('reconnected', () => {
            Log.info('Reconnected to MongoDB');
        })
        .on('disconnected', () => {
            Log.info("Disconnected to DB " + url);
        })
}