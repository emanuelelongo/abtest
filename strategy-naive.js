var random = require('./random');

module.exports = function(cookie, threshold) {
	if(cookie.threshold == threshold) {
		return cookie;
	}

	return {
		abtest: random(threshold),
		threshold: threshold
	};
};