var matchParticiplesPerWord = require("../../../../js/researches/german/passivevoice-german/matchParticiplesPerWord.js")();

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var sentence = "Wir haben gewandert";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ "gewandert" ] );
	});

	it("returns matched participles with 'be' in the middle.", function(){
		var sentence = "Es wird vorbereitet";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ "vorbereitet" ] );
	});

	it("returns matched participles with 'ge' in the middle.", function(){
		var sentence = "Ich habe das aufgewacht";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ "aufgewacht" ] );
	});

	it("returns matched participles with 'er' at the beginning.", function(){
		var sentence = "Sie haben erzählt";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ "erzählt" ] );
	});

	it("returns matched participles with 'iert'.", function(){
		var sentence = "Das wurde probiert";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ "probiert" ] );
	});

	it("returns an empty array when there is no participle", function(){
		var sentence = "Yahoo prüfte seitdem den Sachverhalt.";
		expect( matchParticiplesPerWord( sentence ) ).toEqual( [ ] );
	});
});
