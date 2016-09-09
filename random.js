module.exports = function(probability, callback) {

	var value = (Math.random() * 100) <= probability;

	if(value && callback) {
		return callback();
	}
	return value;
	//return (value && callback && callback()) || value;
}