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

});