# Node.js Intercept stdout

`intercept-stdout` captures or modifies stdout and/or stderr.

Based on [this](https://gist.github.com/benbuckman/2758563) gist.

## Capture
```javascript
// Start capturing stdout.
var intercept = require("intercept-stdout");
var captured_text = "";

var unhook_intercept = intercept(function(text) {
  captured_text += text;
});

console.log("This text is being captured.");

// Stop capturing stdout.
unhook_intercept();

console.log("This text is not being captured.");

// This is the text that was captured.
console.log("CAPTURED:", captured_text);
```

## Modify
```javascript
// Start capturing stdout.
var intercept = require("intercept-stdout");
var modified_text = "";

var unhook_intercept = intercept(function(text) {
  modified_text += text.replace(/captured/i, "modified");
});

console.log("This text is being captured.");

// Stop capturing stdout.
unhook_intercept();

// This is the modified text.
console.log("MODIFIED:", modified_text);
```

## Suppress output

By default, the captured text is still sent to stdout. To avoid this, return an empty string in the interceptor:

```javascript
var intercept = require("intercept-stdout");

var logs = [];

var unhook_intercept = intercept(function(text) {
  logs.push(text);
  return '';
});

console.log("This text won't be sent to stdout.");

// Stop capturing stdout.
unhook_intercept();

// Strings sent to stdout
console.log("Logs:", logs);
```

## Typescript

A declaration file is provided. Use Typescript's [import = require() syntax](
https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require):
```typescript
import intercept = require("intercept-stdout");
```

## Test
```
npm install
npm test
```

## Separating Error Text

Starting in Version 0.1.2, you may now specify two interceptor callbacks. If a second interceptor callback is specified, the second callback will be invoked for `stderr` output.

## Errors and Warnings

Versions > 0.1.1 hook both `stdout` and `stderr`. This change enables capturing of `console.log`, `console.info`, `console.warn`, and `console.error`. This change may break pre-existing interceptors if your interceptor expected output to be a full line of text.

## About Colorization

Popular modules such as [`mocha`](http://mochajs.org/) and [`winston`](https://github.com/winstonjs/winston) may colorize output by inserting ANSI escape codes into the output stream. Both `mocha` and `winston` make multiple calls to the output streams while colorizing a line -- in order to be robust, your code should anticipate and deal with this.
