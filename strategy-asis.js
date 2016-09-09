var random = require('./random');

module.exports = function(cookie, threshold) {
	
	if(cookie.abtest == null 
		|| (cookie.abtest === false && cookie.threshold != threshold)
		|| (cookie.abtest === true && cookie.threshold > threshold)) {
	
		return {
			abtest: random(threshold),
			threshold: threshold
		};	
	}

	return {
		abtest: cookie.abtest,
		threshold: threshold
	};
};