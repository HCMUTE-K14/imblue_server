const Log = require('../log')('RegisterServiceIO');

const RegisterIO= {};
const ServiceRegisted = [];

RegisterIO.register = (service) => {
	Log.info('Registed ' + service.name);
	ServiceRegisted.push(service);
}

RegisterIO.apply = (socket) => {
	Log.info(`${socket.id} apply ${ServiceRegisted.length} service`);
	
	for(let service of ServiceRegisted) {
		service.run(socket);
	}
}

RegisterIO.destroy = () => {
	for(let service of ServiceRegisted) {
		service.stop();
	}
}

module.exports = RegisterIO;