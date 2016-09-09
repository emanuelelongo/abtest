var strategies = {
	naive: require('./strategy-naive'),
	clever: require('./strategy-clever'),
	asis: require('./strategy-asis')
};

function Server(config) {
	this.config = config;
	this.threshold = config.threshold;
}

Server.prototype.request = function(cookie) {
	return strategies[this.config.strategy](cookie, this.threshold);
};


module.exports = Server;