var random = require('./random');

module.exports = function(cookie, threshold) {
	
	if(cookie.abtest == null) {
		return {
			abtest: random(threshold),
			threshold: threshold
		};		
	}

	if(cookie.abtest === false && cookie.threshold < threshold) {
		return {
			abtest: random(threshold - cookie.threshold),
			threshold: threshold
		};	
	}
	
	if(cookie.abtest === true && cookie.threshold > threshold) {
		return {
			abtest: random(cookie.threshold - threshold),
			threshold: threshold
		};	
	}

	return cookie;
};