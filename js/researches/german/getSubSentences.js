var stopwords = require( "./passivevoice-german/stopwords.js" )();
var arrayToRegex = require( "../../stringProcessing/createRegexFromArray.js" );
var stripSpaces = require( "../../stringProcessing/stripSpaces.js" );

var forEach = require( "lodash/forEach" );
var isEmpty = require( "lodash/isEmpty" );

var stopwordRegex = arrayToRegex( stopwords );

/**
 * Splits sentences into subsentences based on stopwords.
 *
 * @param {string} sentence The sentence to split.
 * @param {Array} matches The array with matched stopwords.
 * @returns {Array} The array with subsentences.
 */
function splitOnWord( sentence, matches ) {
	var currentSentence = sentence;
	var subSentences = [];
	forEach( matches, function( match ) {
		var splitSentence = currentSentence.split( match );
		if ( ! isEmpty( splitSentence[ 0 ] ) ) {
			subSentences = subSentences.concat( splitSentence[ 0 ] );
		}
		var startIndex = currentSentence.indexOf( match );
		var endIndex = currentSentence.length;
		currentSentence = ( stripSpaces( currentSentence.substr( startIndex, endIndex ) ) );
	} );
	subSentences = subSentences.concat( stripSpaces( currentSentence ) );
	return subSentences;
}

/**
 * Splits the sentence into subsentences based on stopwords.
 *
 * @param {string} sentence The text to split into subsentences.
 * @returns {Array} The array with subsentences.
 */
function splitSentences( sentence ) {
	var matches = sentence.match( stopwordRegex ) || [];
	return splitOnWord( sentence, matches );
}

module.exports = function( sentence ) {
	return splitSentences( sentence );
};

