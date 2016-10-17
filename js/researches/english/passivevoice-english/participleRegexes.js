var arrayToRegex = require( "../../../stringProcessing/createRegexFromArray.js" );
var stringToRegex = require( "../../../stringProcessing/stringToRegex.js" );

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
/**
 * Matches determiners in sentence parts and returns them and their indices.
 *
 * @param {string} sentencePart The sentence part to match the determiners in.
 * @returns {Array} The list of result objects.
 */
var determiners = function( sentencePart ) {
	var results = [];
	var determinersRegex = arrayToRegex( determinerList );

	// Decided to use a for loop here so that we could retrieve all matches while keeping result objects intact.
	for ( var match = determinersRegex.exec( sentencePart ); match !== null; match = determinersRegex.exec( sentencePart ) ) {
		results.push( {
			match: match[ 0 ],
			index: match.index,
		} );
	}
	return results;
};

/**
 * Matches 'having' in sentence parts and returns it and its index.
 *
 * @param {string} sentencePart The sentence part to match 'having' in.
 * @returns {Array} The list of result objects.
 */
var having = function( sentencePart ) {
	var results = [];
	var havingRegex = stringToRegex( "having" );

	// Decided to use a for loop here so that we could retrieve all matches while keeping result objects intact.
	for ( var match = havingRegex.exec( sentencePart ); match !== null; match = havingRegex.exec( sentencePart ) ) {
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
		having: having,
	};
};
