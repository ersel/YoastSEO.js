var fleschFunction = require( "../../js/researches/calculateFleschReadingDutch.js" );
var Paper = require( "../../js/values/Paper.js" );

describe("a test to calculate the fleschReading score", function(){
	it("returns a score", function(){

		var mockPaper = new Paper( "Een stukje tekst om scores te berekenen.", { locale: "nl_NL" } );
		expect( fleschFunction( mockPaper ) ).toBe( "68.3" );

		mockPaper = new Paper( "" );
		expect( fleschFunction( mockPaper ) ).toBe( 0 );
	});
});
