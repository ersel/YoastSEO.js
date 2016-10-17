var nonverbEndingEd = require( "./passivevoice-english/non-verb-ending-ed.js" )();
var matchWordInSentence = require( "../../stringProcessing/matchWordInSentence.js" );
var getIndicesOfList = require( "../../stringProcessing/indices" ).getIndicesOfList;
var regularVerbsRegex = /\w+ed($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var irregularExclusionArray = [ "get", "gets", "getting", "got", "gotten" ];
var determiners = require( "./passivevoice-english/determiners.js" )();
var irregulars = require( "./passivevoice-english/irregulars.js" )();
var stripSpaces = require( "../../stringProcessing/stripSpaces.js" );

var filter = require( "lodash/filter" );
var includes = require( "lodash/includes" );
var isUndefined = require( "lodash/isUndefined" );

/**
 * Gets regular passive verbs.
 *
 * @param {string} sentencePart The sentence part to check for passive verbs.
 * @returns {Array} The array with all matched verbs.
 */
var getRegularVerbs = function( sentencePart ) {
	// Matches the sentences with words ending in ed
	var matches = sentencePart.match( regularVerbsRegex ) || [];

	// Filters out words ending in -ed that aren't verbs.
	return filter( matches, function( match ) {
		return ! includes( nonverbEndingEd, stripSpaces( match ) );
	} );
};

/**
 * Loops through a list of words and detects if they are present in the sentence.
 *
 * @param {Array} wordList The list of words to filter through.
 * @param {string} sentence The sentence to check for matches.
 * @returns {Array} A list of detected words.
 */
var filterWordListInSentence = function( wordList, sentence ) {
	return filter( wordList, function( word ) {
		return matchWordInSentence( word, sentence );
	} );
};

/**
 * Checks whether the sentence contains an excluded verb.
 *
 * @param {string} sentence The sentence to check for excluded verbs.
 * @returns {boolean} Whether or not the sentence contains an excluded verb.
 */
var hasExcludedIrregularVerb = function( sentence ) {
	return filterWordListInSentence( irregularExclusionArray, sentence ).length !== 0;
};

/**
 * Gets irregular passive verbs.
 *
 * @param {string} sentence The sentence to check for passive verbs.
 * @returns {Array} The array with all matched verbs.
 */
var getIrregularVerbs = function( sentence ) {
	var irregularVerbs = filterWordListInSentence( irregulars, sentence );

	return filter( irregularVerbs, function( verb ) {
		// If rid is used with get, gets, getting, got or gotten, remove it.
		if ( verb !== "rid" ) {
			return true;
		}

		return ! hasExcludedIrregularVerb( sentence );
	} );
};

/**
 * Matches 'having' with a verb directly following it. If so, it is not passive.
 *
 * @param {string} sentencePart The sentence part to check for the word 'having' and a verb
 * @param {Array} verbs The array with verbs to check.
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isHavingException = function( sentencePart, verbs ) {
	// Match having with a verb directly following it. If so it is active.
	var indexOfHaving = sentencePart.indexOf( "having" );

	if ( indexOfHaving > -1 ) {
		var verbIndices = getIndicesOfList( sentencePart, verbs );

		if ( ! isUndefined( verbIndices[ 0 ] ) && ! isUndefined( verbIndices[ 0 ].index ) ) {
			// 7 is the number of characters of the word 'having' including space.
			return verbIndices[ 0 ].index  <= sentencePart.indexOf( "having" ) + 7;
		}
	}
	return false;
};

/**
 * Match 'left'. If left is preceeded by `a` or `the`, it isn't a verb.
 *
 * @param {string} sentencePart The sentence part to check for the word 'left'
 * @param {Array} verbs The array with verbs to check.
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isLeftException = function( sentencePart, verbs ) {
	// Matches left with the or a preceeding.
	var matchLeft = sentencePart.match( /(the|a)\sleft/ig ) || [];
	return matchLeft.length > 0 && verbs[ 0 ].match === "left";
};

/**
 * If the word 'fit' is preceeded by a determiner, it shouldn't be marked as active.
 *
 * @param {string} sentencePart The sentence part to check for the word 'fit'
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isFitException = function( sentencePart ) {
	var indexOfFit = sentencePart.indexOf( "fit" );
	if ( indexOfFit > -1 ) {
		var subString = sentencePart.substr( 0, indexOfFit );
		var determinerIndices = filterWordListInSentence( determiners, subString );
		return determinerIndices.length > 1;
	}
	return false;
};

/**
 * Gets the exceptions. Some combinations shouldn't be marked as passive, so we need to filter them out.
 *
 * @param {string} sentencePart The sentence part to check for exceptions.
 * @param {array} verbs The array of verbs, used to determine exceptions.
 * @returns {boolean} Wether there is an exception or not.
 */
var getExceptions = function( sentencePart, verbs ) {
	if ( isHavingException( sentencePart, verbs ) ) {
		return true;
	}

	if ( isLeftException( sentencePart, verbs ) ) {
		return true;
	}

	if ( isFitException( sentencePart ) ) {
		return true;
	}

	return false;
};

/**
 * Determines whether a sentence part is passive.
 *
 * @param {string} sentencePart The sentence part to determine voice for.
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */

module.exports = function( sentencePart ) {
	var regularVerbs = getRegularVerbs( sentencePart );
	var irregularVerbs = getIrregularVerbs( sentencePart );
	var verbs = regularVerbs.concat( irregularVerbs );

	// Checks for exceptions in the found verbs.
	var exceptions = getExceptions( sentencePart, verbs );

	// If there is any exception, this sentence part cannot be passive.
	return verbs.length > 0 && exceptions === false;
};
