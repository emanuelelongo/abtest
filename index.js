var argv = require('dot-argv');
var UI = require('./UI');
var Server = require('./server');
var Client = require('./client');
var random = require('./random');

var config = {
	threshold: argv.opts.t || 50,
	startingClient: argv.opts.n || 1000,
	lossRate: argv.opts.l || 0,
	gainRate: argv.opts.g || 0,
	strategy: argv.opts.s || 'naive'
}

var clients = [];
var server = new Server(config);
var ui = new UI(server, clients, config);

for(var i = 0; i < config.startingClient; i++){
	clients.push(new Client(server, ui));
}

var newClients = [];

setInterval(function(){
	for(var i=0; i<clients.length; i++) {
		clients[i].request();

		random(config.lossRate, function(){
			clients.splice(i, 1);
			i--;
		});
			
		random(config.gainRate, function(){
			var c = new Client(server, ui);
			c.request();
			newClients.push(c);
		});
	}
	[].push.apply(clients, newClients);
	newClients.splice(0, newClients.length);
	ui.update();
	
}, 500);
