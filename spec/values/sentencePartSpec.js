var SentencePart = require( "../../js/values/SentencePart.js" );

describe( "A test for checking the SentencePart", function() {
	it( "checks the properties of the SentencePart object", function() {
		var mockSentencePart = new SentencePart( "Es wird geschlossen worden sein.", [ "wird", "worden" ],  "de_DE" );
		mockSentencePart.setPassive( true );
		expect( mockSentencePart.getSentencePartText() ).toBe( "Es wird geschlossen worden sein." );
		expect( mockSentencePart.getAuxiliaries() ).toContain( "wird" );
		expect( mockSentencePart.getAuxiliaries() ).toContain( "worden" );
		expect( mockSentencePart.getAuxiliaries().length ).toBe( 2 );
		expect( mockSentencePart.isPassive() ).toBe( true );
		expect( mockSentencePart.getLocale() ).toBe( "de_DE" );
	});
});
