# Node.js Intercept stdout

intercept-stdout captures stdout

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

	npm install mocha -g
	mocha