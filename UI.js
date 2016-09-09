var term = require( 'terminal-kit' ).terminal;

function UI(server, clients, config) {
	var _this = this;
	_this.server = server;
	_this.clients = clients;
	_this.config = config;
	_this.newThreshold = "";
	_this.maxOnToOff = 0;

	term.grabInput() ;

	term.on('key', function(name, matches, data) {  
	    if(name==='CTRL_C') { 
	    	term.nextLine();
	    	term.nextLine();
	    	process.exit(); 
	    }
	    else if(name==="ENTER") {
	    	var  t = parseInt(_this.newThreshold);
	    	if(!isNaN(t))
	    		server.threshold = t;
	    	_this.newThreshold = "";
	    }
	    else if (!isNaN(parseInt(name))){
	    	_this.newThreshold = _this.newThreshold + name;
	    }
	    else {
	    	_this.newThreshold = "";
	    }
	});
}

UI.prototype.update = function(){
	var totalOn = 0;
	var totalOnToOff = 0;

	for(var i=0; i<this.clients.length; i++){
		totalOn += 	this.clients[i].cookie.abtest? 1 : 0;
		totalOnToOff += this.clients[i].onToOff? 1 : 0;
	}
	var percentOnToOff = totalOnToOff / this.clients.length * 100;
	if(percentOnToOff > this.maxOnToOff) {
		this.maxOnToOff = percentOnToOff;
	}
	var totalPercent = totalOn / this.clients.length * 100;

	term.clear();
	term.bgBlack.brightWhite(" " + this.config.strategy.toUpperCase() + " AB-test Simulation ");
	term.nextLine();
	term.nextLine();

	term.brightBlack("Gain: ");
	term.blue(this.config.gainRate+"%");

	var mem = process.memoryUsage();
	term.brightBlack("\t\t\tMemory: ");
	term.brightBlack((mem.rss/1048576).toFixed(1)+ " MB");
	
	term.nextLine();

	term.brightBlack("Loss: ");
	term.blue(this.config.lossRate+"%");
	
	term.brightBlack("\t\t\tHeap: ");
	term.brightBlack((mem.heapUsed/1048576).toFixed(1) + " MB");

	term.nextLine();
	term.nextLine();

	term.brightBlack("Threshold: ");
	term.green(this.server.threshold);

	term.brightBlack("\t\t\tClients: " )
	term.blue(this.clients.length);
	term.nextLine();

	term.brightBlack("ABTest: ")
	term.green(totalPercent.toFixed(1) + "%");

	term.brightBlack("\t\t\tOn-to-Off: ");
	term.blue(percentOnToOff.toFixed(1)+"%");
	if(this.maxOnToOff) {
		term.red(" (max: "+this.maxOnToOff.toFixed(1)+"%)")
	}
	term.nextLine();
	term.nextLine();
	term("new threshold > ");
	term(this.newThreshold);
};

module.exports = UI;