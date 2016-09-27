var stripSpaces = require( "../../../stringProcessing/stripSpaces.js" );
var arrayToRegex = require( "../../../stringProcessing/createRegexFromArray.js" );
var auxiliaries = require( "../../german/passivevoice-german/auxiliaries.js" )();
var matchWordInSentence = require( "../../../stringProcessing/matchWordInSentence.js" );
var stopwords = require( "../../german/passivevoice-german/stopwords.js" )();
var normalizeSingleQuotes = require( "../../../stringProcessing/quotes.js" ).normalizeSingle;

var filter = require( "lodash/filter" );
var isUndefined = require( "lodash/isUndefined" );
var forEach = require( "lodash/forEach" );

var auxiliaryRegex = arrayToRegex( auxiliaries );

/**
 * Returns the indices of a string in a sentence. If it is found multiple times, it will return multiple indices.
 *
 * @param {string} part The part to find in the sentence.
 * @param {string} sentence The sentence to check for parts.
 * @returns {Array} All indices found.
 */
function getIndicesOf( part, sentence ) {
	var startIndex = 0;
	var searchStringLength = part.length;
	var index, indices = [];
	while ( ( index = sentence.indexOf( part, startIndex ) ) > -1 ) {
		indices.push(
			{
				index: index,
				match: part,
			}
		);
		startIndex = index + searchStringLength;
	}
	return indices;
}

/**
 * Matches string with an array, returns the word and the index it was found on.
 *
 * @param {string} sentence The sentence to match the strings from the array to.
 * @param {Array} matches The array with strings to match.
 * @returns {Array} The array with matches, containing the index of the match and the matched string.
 * Returns an empty array if none are found.
 */
var matchArray = function( sentence, matches ) {
	var matchedParts = [];

	forEach( matches, function( part ) {
		part = stripSpaces( part );
		if ( ! matchWordInSentence( part, sentence ) ) {
			return;
		}
		matchedParts = matchedParts.concat( getIndicesOf( part, sentence ) );
	} );

	return matchedParts;
};

/**
 * Gets the indexes of sentence breakers (auxiliaries, stopwords and active verbs) to determine subsentences.
 * Stopwords are filtered because they can contain duplicate matches, like "even though" and "though".
 *
 * @param {string} sentence The sentence to check for indices of auxiliaries, stopwords and active verbs.
 * @returns {Array} The array with valid indices to use for determining subsentences.
 */
var getSentenceBreakers = function( sentence ) {
	sentence = sentence.toLocaleLowerCase();

	return matchArray( sentence, stopwords );
};

/**
 * Gets the subsentences from a sentence by determining sentence breakers.
 *
 * @param {string} sentence The sentence to split up in subsentences.
 * @returns {Array} The array with all subsentences of a sentence that have an auxiliary.
 */
var getSubsentences = function( sentence ) {
	var subSentences = [];

	sentence = normalizeSingleQuotes( sentence );


	var stopwordIndices = getSentenceBreakers( sentence );

	for ( var i = 0; i < stopwordIndices.length; i++ ) {
		var startIndex = 0;
		if ( ! isUndefined( stopwordIndices[ i - 1 ] ) ) {
			startIndex = stopwordIndices[ i - 1 ].index;
			console.log(startIndex)
		}

		// Cut the sentence from the current index to the endIndex (start of next breaker, of end of sentence).
		var subSentence = stripSpaces( sentence.substr( startIndex, stopwordIndices[ i ].index ) );
		subSentences.push( subSentence );
	}

/*
	// If a subsentence doesn't have an auxiliary, we don't need it, so it can be filtered out.
	subSentences = filter( subSentences, function( subSentence ) {
		return subSentence.match( auxiliaryRegex ) !== null;
	} );
*/
	return subSentences;
};

module.exports = function( sentence ) {
	return getSubsentences( sentence );
};
