var $randomColor = $('.random-color');

var getRandomColor = function(min, max) {
	var randomHexCode = '';
	var arr = [];
	var hexOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

	for (var i = 0; i < arr.length; i++) {
		var randomNumber = Math.floor(Math.random() * (max - min)) + min;
		arr.push(hexOptions[randomNumber]);
	}
};
