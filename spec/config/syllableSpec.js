var syllables = require( "../../js/config/syllables.js" );

describe("a test to check if the correct syllables are returned", function(){
	it("returns the English syllable object based on en_US locale ", function(){
		expect( syllables( "en_US" ).exclusionWords ).toContain( jasmine.objectContaining( { word: "shoreline" } ) );
	});
	/*
	it("returns the Dutch syllable object based on en_US locale ", function(){
		expect( syllables( "nl_NL" ).exclusionWords ).toContain( jasmine.objectContaining( { word: "???" } ) );
	});
	*/
	it("returns the default syllable object based on empty string", function(){
		expect( syllables( "" ).exclusionWords ).toContain( jasmine.objectContaining( { word: "shoreline" } ) );
	});
	it(" returns the default  syllable object based on undefined", function(){
		expect( syllables( undefined ).exclusionWords ).toContain( jasmine.objectContaining( { word: "shoreline" } ) );
	});
});
