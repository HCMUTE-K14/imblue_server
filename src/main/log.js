module.exports = (tag) => {
	let LogModule = {};

	LogModule.info = function(message) {
		console.info(`[${tag}]: ${message}`);
	}

	LogModule.warn = function(message) {
		console.warn(`[${tag}]: ${message}`);
	}

	LogModule.error = function(message) {
		console.error(`[${tag}]: ${message}`);
	}

	LogModule.debug = function(message) {
		console.debug(`[${tag}]: ${message}`);
	}

	LogModule.wtf = function(message) {
		console.info(`[${tag}]: ${message}`);
	}

	return LogModule;
}