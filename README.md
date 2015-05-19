# Node.js Intercept stdout

> intercept-stdout captures or modifies stdout.

> _<sup>Based on [this](https://gist.github.com/benbuckman/2758563) gist</sup>_

## Capture
```javascript
var intercept = require("intercept-stdout"),
	captured_text = "";

var unhook_intercept = intercept(function(txt) {
	captured_text += txt;
});

console.log("This text is being captured");

// Let's stop capturing stdout.
unhook_intercept();

console.log("This text is not being captured");
```

## Modify
```javascript
var intercept = require("intercept-stdout");

var unhook_intercept = intercept(function(txt) {
	return txt.replace( /this/i , 'that' );
});

console.log("This text is being modified");
// -> that text is being modified
```

## Test

	npm install
	npm test
