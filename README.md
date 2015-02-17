# Node.js Intercept stdout

intercept-stdout captures stdout

Based on [this](https://gist.github.com/benbuckman/2758563) gist.

## Usage

	var intercept = require("intercept-stdout"),
		captured_text = "";

	var unhook_intercept = intercept(function(txt) {
		captured_text += txt;
	});

	console.log("This text is being captured");

	// Let's stop capturing stdout.
	unhook_intercept();

	console.log("This text is not being captured");

## Test

	npm install
	npm test
