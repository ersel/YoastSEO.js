var getParticiples = require("../../../../js/researches/german/passivevoice-german/getParticiples.js");

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var sentence = "Wir haben gewandert";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "gewandert" );
	});

	it("returns matched participles with 'be' in the middle.", function(){
		var sentence = "Es wird vorbereitet";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "vorbereitet" );
	});

	it("returns matched participles with 'ge' in the middle.", function(){
		var sentence = "Ich habe das aufgewacht";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "aufgewacht" );
	});

	it("returns matched participles with 'er' at the beginning.", function(){
		var sentence = "Sie haben erzählt";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "erzählt" );
	});

	it("returns matched participles with 'iert'.", function(){
		var sentence = "Das wurde probiert";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "probiert" );
	});

	it("returns an empty array when there is no participle", function(){
		var sentence = "Yahoo prüfte seitdem den Sachverhalt.";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples ).toEqual( [] );
	});
});
