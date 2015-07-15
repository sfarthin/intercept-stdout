# Node.js Intercept stdout

> intercept-stdout captures or modifies stdout and/or stderr.

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

## Separating Error Text

Starting in Version 0.1.2, you may now specify two interceptor callbacks. If a second interceptor callback is specified, the second callback will be invoked for `stderr` output.

## Errors and Warnings

Versions > 0.1.1 hook both `stdout` and `stderr`. This change enables capturing of `console.log`, `console.info`, `console.warn`, and `console.error`. This change may break pre-existing interceptors if your interceptor expected output to be a full line of text.

## About Colorization

Popular modules such as [`mocha`](http://mochajs.org/) and [`winston`](https://github.com/winstonjs/winston) may colorize output by inserting ANSI escape codes into the output stream. Both `mocha` and `winston` make multiple calls to the output streams while colorizing a line -- in order to be robust, your code should anticipate and deal with this.
