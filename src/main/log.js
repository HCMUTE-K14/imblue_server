module.exports = (tag) => {
	let LogModule = {};

	function logTemplate(level, tag, message) {
		return new Date().toLocaleString() + ` [${level}] ${tag}: ${message}`;
	}

	LogModule.info = function(message) {
		console.info(logTemplate('INFO', tag, message));
	}

	LogModule.warn = function(message) {
		console.warn(logTemplate('WARNING', tag, message));
	}

	LogModule.error = function(message) {
		console.error(logTemplate('ERROR', tag, message));
	}

	LogModule.debug = function(message) {
		console.debug(logTemplate('DEBUG', tag, message));
	}

	LogModule.wtf = LogModule.info;

	return LogModule;
}