var getParticiples = require("../../../../js/researches/english/passivevoice-english/getParticiples.js");

describe("Test for matching English participles", function(){
	it("returns matched regular participles.", function(){
		var sentence = "He was fired.";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "fired" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "regular" );
		expect( foundParticiples[ 0 ].getSentencePart() ).toEqual( "He was fired." );
		expect( foundParticiples[ 0 ].getAuxiliary() ).toEqual( "was" );
		expect( foundParticiples[ 0 ].determinesSentencePartIsPassive() ).toEqual( true );
	});

	it("returns matched irregular participles.", function(){
		var sentence = "The show was broadcast at a new channel.";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "broadcast" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "irregular" );
		expect( foundParticiples[ 0 ].getSentencePart() ).toEqual( "The show was broadcast at a new channel." );
		expect( foundParticiples[ 0 ].getAuxiliary() ).toEqual( "was" );
		expect( foundParticiples[ 0 ].determinesSentencePartIsPassive() ).toEqual( true );
	});

	it("returns an empty array when there is no participle", function(){
		var sentence = "Yahoo prüfte seitdem den Sachverhalt.";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples ).toEqual( [] );
	});
});
