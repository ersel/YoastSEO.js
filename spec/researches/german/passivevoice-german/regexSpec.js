var regexFunction = require("../../../../js/researches/german/passivevoice-german/regex.js")();
var verbsBeginningWithGe = regexFunction.verbsBeginningWithGe;
var verbsWithGeInMiddle = regexFunction.verbsWithGeInMiddle;
var verbsBeginningWithErVerEntBeZer = regexFunction.verbsBeginningWithErVerEntBeZer;
var verbsWithErVerEntBeZerInMiddle = regexFunction.verbsWithErVerEntBeZerInMiddle;
var verbsEndingWithIert = regexFunction.verbsEndingWithIert;
var noParticiple = regexFunction.noParticiple;

describe("Test for matching German participles", function(){
	it("returns matched participles with 'ge' at the beginning.", function(){
		var word = "gewandert";
		expect( verbsBeginningWithGe( word ) ).toEqual( [ "gewandert" ] );
		var word = "vorgesetzt";
		expect( verbsBeginningWithGe( word ) ).toEqual( [ ] );
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
	it("returns matched participles with 'iert' at the end.", function(){
		var word = "bedenkzeit";
		expect( noParticiple( word ) ).toEqual( [ "bedenkzeit" ] );
		var word = "bedruckt";
		expect( noParticiple( word ) ).toEqual( [ ] );
	});
});
