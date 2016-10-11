var getParticiples = require("../../../../js/researches/german/passivevoice-german/getParticiples.js")();

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var sentence = "Wir haben gewandert";
		expect( getParticiples( sentence ) ).toEqual( [ "gewandert" ] );
	});

	it("returns matched participles with 'be' in the middle.", function(){
		var sentence = "Es wird vorbereitet";
		expect( getParticiples( sentence ) ).toEqual( [ "vorbereitet" ] );
	});

	it("returns matched participles with 'ge' in the middle.", function(){
		var sentence = "Ich habe das aufgewacht";
		expect( getParticiples( sentence ) ).toEqual( [ "aufgewacht" ] );
	});

	it("returns matched participles with 'er' at the beginning.", function(){
		var sentence = "Sie haben erzählt";
		expect( getParticiples( sentence ) ).toEqual( [ "erzählt" ] );
	});

	it("returns matched participles with 'iert'.", function(){
		var sentence = "Das wurde probiert";
		expect( getParticiples( sentence ) ).toEqual( [ "probiert" ] );
	});

	it("returns an empty array when there is no participle", function(){
		var sentence = "Yahoo prüfte seitdem den Sachverhalt.";
		expect( getParticiples( sentence ) ).toEqual( [ ] );
	});
});
