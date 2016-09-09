var random = require('./random');

module.exports = function(cookie, threshold) {
	
	if(cookie.abtest == null) {
		return {
			abtest: random(threshold),
			threshold: threshold
		};		
	}

	if(cookie.abtest === false && cookie.threshold < threshold) {
		var newThreshold = (threshold - cookie.threshold) * 100  / (100 - cookie.threshold);
		return {
			abtest: random(newThreshold),
			threshold: threshold
		};	
	}
	
	if(cookie.abtest === true && cookie.threshold > threshold) {
		var newThreshold = 100 - (100 * (cookie.threshold - threshold) / (cookie.threshold));
		return {
			abtest: random(newThreshold),
			threshold: threshold
		};	
	}

	return {
		abtest: cookie.abtest,
		threshold: threshold
	};
};