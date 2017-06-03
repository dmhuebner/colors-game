/***** Initial Variables *****/
var $randomColor = $('.random-color');
var attempts = 3;
$('#attempts-left').text("Attempts: " + attempts);

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


/*===== ON LOAD =====*/
$(window).load(function() {

	/***** Function | Box Click Handler *****/
	var boxClickHandler = function() {
	 var rgbBackground = $(this).css('background-color');
		if (rgb2hex(rgbBackground).toUpperCase() === $randomColor.text()) {
			$('body').css('background-color', currentRandomBoxColor);
			$('.box').css('background-color', currentRandomBoxColor);
			$('h1.main-heading').text('That\'s the one!');
			$('#attempts-left').text("Nice!");

			$(this).animate({  borderSpacing: -180 }, {
			    step: function(now,fx) {
			      $(this).css('-webkit-transform','rotate('+now+'deg)');
			      $(this).css('-moz-transform','rotate('+now+'deg)');
			      $(this).css('transform','rotate('+now+'deg)');
			    },
			    duration: 300
			},'linear');
		} else {
			attempts -= 1;
			$('#attempts-left').text("Attempts: " + attempts);
			if (attempts <= 0) {
				// $('h1.main-heading').text('Game Over :-()');
				alert("Game over");
				location.reload();
			} else {
				$('#attempts-left').text("Attempts: " + attempts);
			}
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

	$('.box-wrapper').empty();
	generateBoxes();

	/***** Function | Get random box color to Guess *****/
	var getRandomBoxColor = function() {
		var randomBoxNum = Math.floor(Math.random() * 6) + 1;
		var randomRgbColor = ($('.box-wrapper #box-' + randomBoxNum).css('background-color'));
		return rgb2hex(randomRgbColor).toUpperCase();
	};

	var currentRandomBoxColor = getRandomBoxColor();

	$randomColor.text(currentRandomBoxColor);

	/***** Function | Reset Button Click Handler *****/
	$('button.reset-button').click(function() {
		$('.box-wrapper').empty();
		generateBoxes();
		currentRandomBoxColor = getRandomBoxColor();
		$randomColor.text(currentRandomBoxColor);
		$('h1.main-heading').text('Welcome to The Colors Game!');
		$('body').css('background-color', 'rgba(0, 0, 0, 0.9)');
		attempts = 3;
		$('#attempts-left').text("Attempts: " + attempts);
	});
});
