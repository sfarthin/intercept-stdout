// Borrowed.
// https://gist.github.com/benbuckman/2758563


var toArray	= require('lodash.toarray'),
	util			= require('util');

// Intercept stdout and stderr to pass output thru callback.
//
//  Optionally, takes two callbacks.
//    If two callbacks are specified, 
//      the first intercepts stdout, and
//      the second intercepts stderr.
//
// returns an unhook() function, call when done intercepting
module.exports = function (stdoutIntercept, stderrIntercept) {
	stderrIntercept = stderrIntercept || stdoutIntercept;

	var old_stdout_write = process.stdout.write;
	var old_stderr_write = process.stderr.write;

	process.stdout.write = (function(write) {
		return function(string, encoding, fd) {
			var args = toArray(arguments);
			args[0] = interceptor( string, stdoutIntercept );
			write.apply(process.stdout, args);
		};
	}(process.stdout.write));

	process.stderr.write = (function(write) {
		return function(string, encoding, fd) {
			var args = toArray(arguments);
			args[0] = interceptor( string, stderrIntercept );
			write.apply(process.stderr, args);
		};
	}(process.stderr.write));

	function interceptor(string, callback) {
		// only intercept the string
		var result = callback(string);
		if (typeof result == 'string') {
			string = result.replace( /\n$/ , '' ) + (result && (/\n$/).test( string ) ? '\n' : '');
		}
		return string;
	}

	// puts back to original
	return function unhook() {
		process.stdout.write = old_stdout_write;
		process.stderr.write = old_stderr_write;
	};

};
