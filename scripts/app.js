/***** Initial Variables *****/
var $randomColor = $('.random-color');
var attempts = 2;

/***** Function | Get random hex code *****/
var getRandomHexCode = function() {
  var randomHexArray = ['#'];
  var randomHexOutput = '';
  var hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'];

  for (var i = 0; i < 6; i++) {
    var randomHexDigit = Math.floor(Math.random() * 15) + 1;
    randomHexArray.push(hexRef[randomHexDigit]);
  }
  randomHexOutput = randomHexArray.join('');
  return randomHexOutput;
};

/*** Function | Convert hex format to a rgb color ***/
var rgb2hex = function(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

/***** Function | Build Box Template *****/
var buildBoxTemplate = function(boxNum) {
	var template =
		'<div class="box col-sm-4" id="box-' + boxNum + '"' + '></div>';
	return $(template);
};

/***** Function | Box Click Handler *****/
var boxClickHandler = function() {
 var rgbBackground = $(this).css('background-color');
	if (rgb2hex(rgbBackground).toUpperCase() === $randomColor.text()) {
		alert('That is the right one!');
	}
};

/***** Function | Generate Boxes *****/
var generateBoxes = function() {
	for (var i = 0; i < 6; i++) {
		var $newBox = buildBoxTemplate(i + 1);
		$newBox.css('background-color', getRandomHexCode())
		$newBox.click(boxClickHandler);
		$('.box-wrapper').append($newBox);
	}
};

/*===== ON LOAD =====*/
$(window).load(function() {

	$('.box-wrapper').empty();

	generateBoxes();

	/***** Function | Get random box color to Guess *****/
	var getRandomBoxColor = function() {
		var randomBoxNum = Math.floor(Math.random() * 6) + 1;
		var randomRgbColor = ($('.box-wrapper #box-' + randomBoxNum).css('background-color'));
		return rgb2hex(randomRgbColor).toUpperCase();
	};

	$randomColor.text(getRandomBoxColor());

});
