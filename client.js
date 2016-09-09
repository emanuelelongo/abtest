function Client(server) {
	this.server = server;
	this.cookie = {};
	this.onToOff = false;
}

Client.prototype.request = function() {
	var response = this.server.request(this.cookie);
	this.onToOff = this.onToOff || this.cookie.abtest && (response.abtest === false);
	this.cookie.abtest = response.abtest;
	this.cookie.threshold = response.threshold;
};

module.exports = Client;