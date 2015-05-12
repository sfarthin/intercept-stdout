var expect = require("chai").expect,
	Intercept = require("../intercept-stdout.js");

describe("intercept-stdout", function() {

	it("should capture stdout when initialized and not when it is unhooked", function() {
		
		// Lets set up our intercept
		var captured_text = "";
		var unhook = Intercept(function(txt) {
			captured_text += txt;
		});
		
		// Lets try each of these pieces of text
		var arr = ["capture-this!", "日本語", "-k21.12-0k-ª–m-md1∆º¡∆ªº"];
		arr.forEach(function(txt) {
			
			// Make sure we don't see the captured text yet.
			expect(captured_text).to.not.have.string(txt);
			
			// send to stdout.
			console.log(txt);
			
			// Make sure we have the captured text.
			expect(captured_text).to.have.string(txt);
			
		});
		
		
		unhook();
		captured_text = "";
		
		var arr = ["capture-this!", "日本語", "-k21.12-0k-ª–m-md1∆º¡∆ªº"];
		arr.forEach(function(txt) {

			// send to stdout.
			console.log(txt);
			
			// Make sure we have not captured text.
			expect(captured_text).to.be.equal("");
			
		});
		
	});

	it("should modify output if callback returns a string", function() {

		var captured = [];
		var unhook = Intercept(function(txt) {
			var mod = modified[captured.length];
			captured.push( mod );
			return mod;
		});

		var arr = ["capture-this!", "日本語", "-k21.12-0k-ª–m-md1∆º¡∆ªº"];
		var modified = ["print-this!", "asdf", ""];

		arr.forEach(function(txt) {
			// send to stdout.
			console.log(txt);
			// make sure captured doesn't contain the original text
			expect(captured).to.not.contain(txt);
		});

		expect(captured).to.eql(modified);

		unhook();

	});

	it("should do the same for console.error", function() {

		var captured = [];
		var unhook = Intercept(function(txt) {
			var mod = modified[captured.length];
			captured.push( mod );
			return mod;
		});

		var arr = ["capture-this!", "日本語", "-k21.12-0k-ª–m-md1∆º¡∆ªº"];
		var modified = ["print-this!", "asdf", ""];

		arr.forEach(function(txt) {
			console.error(txt);
		});

		expect(captured).to.eql(modified);

		unhook();
	});

});
