var EnglishSentencePart = require( "../../../js/researches/english/EnglishSentencePart.js");

describe( "creates a english sentence part", function() {
	it ( "makes sure the german sentence part inherits all functions", function() {
		var mockPart = new EnglishSentencePart( "English text." );
		expect( mockPart.getSentencePartText() ).toBe( "English text." );
	} );
} );
/*

describe( "gets participles of german sentence", function() {
	it( "returns participles", function() {
		var mockPart = new GermanSentencePart( "Es wurde gekauft" );
		var foundParticiples = mockPart.getParticiples()[ 0 ];
		expect( foundParticiples.getParticiple() ).toEqual( "gekauft" );
	});
} );
*/
