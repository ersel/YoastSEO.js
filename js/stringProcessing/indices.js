var isUndefined = require( "lodash/isUndefined" );
var forEach = require( "lodash/forEach" );
var stripSpaces = require( "../stringProcessing/stripSpaces.js" );
var matchWordInSentence = require( "../stringProcessing/matchWordInSentence.js" );

/**
 * Returns the indices of a string in a text. If it is found multiple times, it will return multiple indices.
 *
 * @param {string} word The word to find in the text.
 * @param {string} text The text to check for the given word..
 * @returns {Array} All indices found.
 */
function getIndicesByWord( word, text ) {
	var startIndex = 0;
	var searchStringLength = word.length;
	var index, indices = [];
	while ( ( index = text.indexOf( word, startIndex ) ) > -1 ) {
		indices.push(
			{
				index: index,
				match: word,
			}
		);
		startIndex = index + searchStringLength;
	}
	return indices;
}

/**
 * Matches string with an array, returns the word and the index it was found on.
 *
 * @param {Array} words The array with strings to match.
 * @param {string} text The text to match the strings from the array to.
 * @returns {Array} The array with words, containing the index of the match and the matched string.
 * Returns an empty array if none are found.
 */
var getIndicesByWordList = function( words, text ) {
	var matchedWords = [];

	forEach( words, function( word ) {
		word = stripSpaces( word );
		if ( ! matchWordInSentence( word, text ) ) {
			return;
		}
		matchedWords = matchedWords.concat( getIndicesByWord( word, text ) );
	} );

	return matchedWords;
};

/**
 * Sorts the array on the index property of each entry.
 *
 * @param {Array} indices The array with indices.
 * @returns {Array} The sorted array with indices.
 */
var sortIndices = function( indices ) {
	return indices.sort( function( a, b ) {
		return ( a.index > b.index );
	} );
};

/**
 * Filters duplicate entries if the indices overlap.
 *
 * @param {Array} indices The array with indices to be filtered.
 * @returns {Array} The filtered array.
 */
var filterIndices = function( indices ) {
	indices = sortIndices( indices );
	var filtered = [];
	for ( var i = 0; i < indices.length; i++ ) {
		// If the next index is within the range of the current index and the length of the word, remove it
		// This makes sure we don't match combinations twice, like "even though" and "though".
		if ( ! isUndefined( indices[ i + 1 ] ) && indices[ i + 1 ].index < indices[ i ].index + indices[ i ].match.length ) {
			filtered.push( indices[ i ] );

			// Adds 1 to i, so we skip the next index that is overlapping with the current index.
			i++;
			continue;
		}
		filtered.push( indices[ i ] );
	}
	return filtered;
};

module.exports = {
	getIndicesByWord: getIndicesByWord,
	getIndicesByWordList: getIndicesByWordList,
	filterIndices: filterIndices,
	sortIndices: sortIndices,
};
