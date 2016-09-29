var regexFunction = require("../../../../js/researches/german/passivevoice-german/regex.js")();
var verbsBeginningWithGe = regexFunction.verbsBeginningWithGe;
var verbsWithGeInMiddle = regexFunction.verbsWithGeInMiddle;
var verbsBeginningWithErVerEntBeZer = regexFunction.verbsBeginningWithErVerEntBeZer;
var verbsWithErVerEntBeZerInMiddle = regexFunction.verbsWithErVerEntBeZerInMiddle;
var verbsEndingWithIert = regexFunction.verbsEndingWithIert;
var exceptions = regexFunction.exceptions;

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var word = "gewandert";
		expect( verbsBeginningWithGe( word ) ).toEqual( [ "gewandert" ] );
		var word = "vorgesetzt";
		expect( verbsBeginningWithGe( word ) ).toEqual( [ ] );
		var word = "gekauft.";
		expect( verbsBeginningWithGe( word ) ).toEqual( [ "gekauft." ] );
	});
	it("returns matched participles with 'ge' in the middle.", function(){
		var word = "vorgesetzt";
		expect( verbsWithGeInMiddle( word ) ).toEqual( [ "vorgesetzt" ] );
		var word = "Bett";
		expect( verbsWithGeInMiddle( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'er/ver/ent/be/zer' at the beginning.", function(){
		var word = "bereitet";
		expect( verbsBeginningWithErVerEntBeZer( word ) ).toEqual( [ "bereitet" ] );
		var word = "vorbereitet";
		expect( verbsBeginningWithErVerEntBeZer( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'er/ver/ent/be/zer' in the middle.", function(){
		var word = "vorbereitet";
		expect( verbsWithErVerEntBeZerInMiddle( word ) ).toEqual( [ "vorbereitet" ] );
		var word = "Regen";
		expect( verbsWithErVerEntBeZerInMiddle( word ) ).toEqual( [ ] );
	});
	it("returns matched participles with 'iert' at the end.", function(){
		var word = "rasiert";
		expect( verbsEndingWithIert( word ) ).toEqual( [ "rasiert" ] );
		var word = "infizierten";
		expect( verbsEndingWithIert( word ) ).toEqual( [ ] );
	});
	it("returns matched participles that are in the exceptionParticiplesActive list.", function(){
		var word = "bedenkzeit";
		expect( exceptions( word ) ).toEqual( [ "bedenkzeit" ] );
		var word = "bedruckt";
		expect( exceptions( word ) ).toEqual( [ ] );
	});
});
