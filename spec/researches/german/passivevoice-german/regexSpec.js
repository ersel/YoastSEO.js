var regexFunction = require("../../../../js/researches/german/passivevoice-german/participleRegexes.js")();
var participlesBeginningWithGe = regexFunction.participlesBeginningWithGe;
var participlesWithGeInMiddle = regexFunction.participlesWithGeInMiddle;
var participlesBeginningWithErVerEntBeZer = regexFunction.participlesBeginningWithErVerEntBeZer;
var participlesWithErVerEntBeZerInMiddle = regexFunction.participlesWithErVerEntBeZerInMiddle;
var participlesEndingWithIert = regexFunction.participlesEndingWithIert;
var irregularParticiples = regexFunction.irregularParticiples;
var exceptions = regexFunction.exceptions;

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var word = "gewandert";
		expect( participlesBeginningWithGe( word ) ).toEqual( [ "gewandert" ] );
		var word = "vorgesetzt";
		expect( participlesBeginningWithGe( word ) ).toEqual( [ ] );
		var word = "gekauft.";
		expect( participlesBeginningWithGe( word ) ).toEqual( [ "gekauft." ] );
	});
	it("returns matched participles with 'ge' in the middle.", function(){
		var word = "vorgesetzt";
		expect( participlesWithGeInMiddle( word ) ).toEqual( [ "vorgesetzt" ] );
		var word = "Bett";
		expect( participlesWithGeInMiddle( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'er/ver/ent/be/zer' at the beginning.", function(){
		var word = "bereitet";
		expect( participlesBeginningWithErVerEntBeZer( word ) ).toEqual( [ "bereitet" ] );
		var word = "vorbereitet";
		expect( participlesBeginningWithErVerEntBeZer( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'er/ver/ent/be/zer' in the middle.", function(){
		var word = "vorbereitet";
		expect( participlesWithErVerEntBeZerInMiddle( word ) ).toEqual( [ "vorbereitet" ] );
		var word = "Regen";
		expect( participlesWithErVerEntBeZerInMiddle( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'iert' at the end.", function(){
		var word = "rasiert";
		expect( participlesEndingWithIert( word ) ).toEqual( [ "rasiert" ] );
		var word = "infizierten";
		expect( participlesEndingWithIert( word ) ).toEqual( [ ] );
	});
	it("returns matched irregular participles.", function(){
		var word = "geschmolzen";
		expect( irregularParticiples( word ) ).toEqual( [ "geschmolzen" ] );
		var word = "infizierten";
		expect( irregularParticiples( word ) ).toEqual( [ ] );
	});
	it("returns matched participles that are in the exceptionParticiplesActive list.", function(){
		var word = "bedenkzeit";
		expect( exceptions( word ) ).toEqual( [ "bedenkzeit" ] );
		var word = "bedruckt";
		expect( exceptions( word ) ).toEqual( [ ] );
	});
});
