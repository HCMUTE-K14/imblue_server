const Http = require('http');

const App = require('./src/main/app');
const DB = require('./src/main/db');
const IO = require('./src/main/socket/io.server');
const Log = require('./src/main/log')('Server');

const Server = Http.createServer(App);

Server.listen(App.get('port'), () => {
    Log.wtf(`Application run at port ${App.get('port')}`);
    DB.openConnect();
    IO.start();
});

