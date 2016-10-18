var Sentence = require( "../../js/values/Sentence.js" );

describe( "A test for checking a Sentence", function() {
	it("checks the properties of a Sentence", function () {
		var mockSentence = new Sentence( "Es wird geschlossen worden sein.", "de_DE" );
		expect( mockSentence.getSentenceText() ).toBe( "Es wird geschlossen worden sein." );
		expect( mockSentence.getLocale() ).toBe( "de_DE" );
	});
	it("checks the properties of a Sentence without explicit locale", function () {
		var mockSentence = new Sentence( "He was trapped.");
		expect( mockSentence.getSentenceText() ).toBe( "He was trapped." );
		expect( mockSentence.getLocale() ).toBe( "en_US" );
	});
});




