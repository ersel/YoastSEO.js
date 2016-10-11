var getParticiples = require("../../../../js/researches/german/passivevoice-german/getParticiples.js");

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var sentence = "Wir haben gewandert";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "gewandert" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "ge at beginning" );
		expect( foundParticiples[ 0 ].getSentencePart() ).toEqual( "Wir haben gewandert" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "ge at beginning" );
	});

	it("returns matched participles with 'be' in the middle.", function(){
		var sentence = "Es wird vorbereitet";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "vorbereitet" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "er/ver/ent/be/zer/her in the middle" );
	});

	it("returns matched participles with 'ge' in the middle.", function(){
		var sentence = "Ich habe das aufgewacht";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "aufgewacht" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "ge in the middle" );
	});

	it("returns matched participles with 'er' at the beginning.", function(){
		var sentence = "Sie haben erzählt";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "erzählt" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "er/ver/ent/be/zer/her at beginning" );
	});

	it("returns matched participles with 'iert'.", function(){
		var sentence = "Das wurde probiert";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples[ 0 ].getParticiple() ).toEqual( "probiert" );
		expect( foundParticiples[ 0 ].getType() ).toEqual( "iert at the end" );
	});

	it("returns an empty array when there is no participle", function(){
		var sentence = "Yahoo prüfte seitdem den Sachverhalt.";
		var foundParticiples = getParticiples( sentence );
		expect( foundParticiples ).toEqual( [] );
	});
});
