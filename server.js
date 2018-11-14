const App = require('./src/main/app');
const DB = require('./src/main/db');
const Log = require('./src/main/log')('Server');

App.listen(App.get('port'), () => {
    Log.info(`Application run at port ${App.get('port')}`);
    DB.openConnect();
});

