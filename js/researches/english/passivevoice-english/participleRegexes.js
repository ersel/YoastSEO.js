var arrayToRegex = require( "../../../stringProcessing/createRegexFromArray.js" );

var irregulars = require( "./irregulars" )();
var regularParticiplesRegex = /\w+ed($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var determinerList = require( "./determiners" )();

var regularParticiples = function( word ) {
	return word.match( regularParticiplesRegex ) || [];
};
var irregularParticiples = function( word ) {
	var irregularRegex =  arrayToRegex( irregulars );
	return word.match( irregularRegex ) || [];
};
// Todo: is geen participle regex
var determiners = function( word ) {
	var results = [];
	var determinersRegex = arrayToRegex( determinerList );

	// Decided to use a for loop here so that we could retrieve all matches while keeping result objects intact.
	for ( var match = determinersRegex.exec( word ); match !== null; match = determinersRegex.exec( word ) ) {
		results.push( {
			match: match[ 0 ],
			index: match.index,
		} );
	}
	return results;
};

module.exports = function() {
	return {
		regularParticiples: regularParticiples,
		irregularParticiples: irregularParticiples,
		determiners: determiners,
	};
};
