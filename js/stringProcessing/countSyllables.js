/** @module stringProcessing/countSyllables */

var cleanText = require( "../stringProcessing/cleanText.js" );
var getWords = require( "../stringProcessing/getWords.js" );
var syllableArray = require( "../config/syllables.js" );
var arrayToRegex = require( "../stringProcessing/createRegexFromArray.js" );
var forEach = require( "lodash/forEach" );
var find = require( "lodash/find" );
var isUndefined = require( "lodash/isUndefined" );

/**
 * The function removing a matched word(part) from a string.
 *
 * @param {String} word The original word.
 * @param {RegExp} replacementRegex The regex used for the deleting.
 * @returns {string} The word that is the result of the deleting.
 */
var replaceWord = function ( word, replacementRegex ) {
	return word.replace( replacementRegex, "" );
};

/**
 * The function that creates a regex out of a word that should be found anywhere in the string.
 *
 * @param {String} word A word that should be found anywhere in the string.
 * @param {String} letters The letters that shouldn't be matched when following the word.
 * @returns {String} The regex created with the exclusion words and disallowed letters.
 */
var getExclusionAnywhere = function ( word, letters ) {
	return "(" + word + "[^"+ letters + "])|(" + word + "$)";
};

/**
 * The function that creates a regex out of a word that should be found at the beginning or end of the string.
 *
 * @param {String} word A word that should be found at the beginning or end of the string.
 * @param {String} letters The letters that shouldn't be matched when following the word.
 * @returns {string} The regex created with the exclusion words and disallowed letters.
 */
var getExclusionBeginEnd = function ( word, letters ) {
	return "(^" + word + "[^"+ letters + "])|(" + word + "$)";
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found anywhere in a string, but not if followed by an 'n'.
 * @returns {String} The regex-string.
 */
var getExclusionsNoNRegex = function ( word ) {
	return getExclusionAnywhere( word, "n" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found anywhere in a string, but not if followed by an 'n' or 's'.
 * @returns {String} The regex-string.
 */
var getExclusionsNoNSRegex = function ( word ) {
	return getExclusionAnywhere( word, "ns" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found anywhere in a string, but not if followed by an 'r' or 's'.
 * @returns {String} The regex-string.
 */
var getExclusionsNoRSRegex = function ( word ) {
	return getExclusionAnywhere( word, "rs" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found anywhere in a string, but not if followed by an 'n' or 'r'.
 * @returns {String} The regex-string.
 */
var getExclusionsNoNRRegex = function ( word ) {
	return getExclusionAnywhere( word, "nr" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found anywhere in a string, but not if followed by an 'n', 'r' or 's'.
 * @returns {String} The regex-string.
 */
var getExclusionsNoNRSRegex = function ( word ) {
	return getExclusionAnywhere( word, "nrs" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found at the beginning or end of a string, but not if followed by an 's'.
 * @returns {String} The regex-string.
 */
var getExclusionsBeginEndNoSRegex = function ( word ) {
	return getExclusionBeginEnd( word, "s" );
};

/**
 * The function that creates a regex-string.
 *
 * @param {String} word A word that should be found at the beginning or end of a string, but not if followed by an 'n' or 'r'.
 * @returns {String} The regex-string.
 */
var getExclusionsBeginEndNoNRRegex = function ( word ) {
	return getExclusionBeginEnd( word, "nr" );
};

var getExclusionsBeginEndNoNRSRegex = function ( word ) {
	return getExclusionBeginEnd( word, "nrs" );
};

var getExclusionWordPartRegex = function ( word ) {
	return "(" + word + ")";
};

var getExclusionCompoundRegex = function ( word ) {
	return "^(" + word + ")|(" + word + "$)";
};

var getExclusionCompoundEndRegex = function ( word ) {
	return "(" + word + "$)";
};

var getExclusionsEndPluralRegex = function ( word ) {
	return "^(" + word + "s?)|(" + word + "s?$)";
};

var getExclusionsBeginNoSRegex = function ( word ) {
	return "(^" + word + "[^s])|(^" + word + "$)";
};


/**
 * The function building a regex for the list of exclusion words.
 *
 * @param {Array} exclusionWords The exclusion words to match in the regex.
 * @param {Function} getExclusionRegex The function building the regex for a word.
 * @returns {RegExp} The regex built with the exclusion words.
 */
var getRegex = function ( exclusionWords, getExclusionRegex ) {
	var wordArray = [];
	for ( var k = 0; k < exclusionWords.length; k++ ) {
		wordArray.push( getExclusionRegex( exclusionWords[ k ].word ) );
	}
	return arrayToRegex( wordArray, true );
};

/**
 * The function building a regex for exclusion words that should be found at the end of a string.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the end of a string.
 */
var getCompoundRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionCompounds, getExclusionCompoundRegex );
};

/**
 * The function building a regex for exclusion words that should be found at the beginning or end of a string.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the beginning or end of a string.
 */
var getCompoundEndRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionCompoundEnds, getExclusionCompoundEndRegex );
};

/**
 * The function building a regex for exclusion words that should be found at the end of the string, including their plurals.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the end of the string, including their plurals.
 */
var getEndPluralRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsEndPlural, getExclusionsEndPluralRegex );
};

/**
 * The function building a regex for exclusion words that should be found at the begin or end of the string, but not if followed by an 's'
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the begin
 * or end of the string, but not if followed by an 's'
 */
var getBeginEndNoSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsBeginEndNoS, getExclusionsBeginEndNoSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found at the beginning of a string, but not if followed by an 's'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the beginning of a string,
 * but not if followed by an 's'.
 */
var getBeginNoSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsBeginNoS, getExclusionsBeginNoSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string, but not if followed by an 'n'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string,
 * but not if followed by an 'n'.
 */
var getNoNRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsNoN, getExclusionsNoNRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string, but not if followed by an 'n' or 's'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string,
 * but not if followed by an 'n' or 's'.
 */
var getNoNSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsNoNS, getExclusionsNoNSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string, but not if followed by an 'r' or 's'..
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string,
 * but not if followed by an 'r' or 's'..
 */
var getNoRSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsNoRS, getExclusionsNoRSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string, but not if followed by an 'n' or 'r'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string,
 * but not if followed by an 'n' or 'r'.
 */
var getNoNRRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsNoNR, getExclusionsNoNRRegex );
};

/**
 * The function building a regex for exclusion words that that should be found at the beginning or end of a string.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the beginning or end of a string.
 */
var getBeginEndNoNRRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsBeginEndNoNR, getExclusionsBeginEndNoNRRegex );
};

/**
 * The function building a regex for exclusion words that that should be found at the beginning
 * or end of a string, but not if followed by an 'n' or 'r'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found at the beginning or end of a string,
 * but not if followed by an 'n' or 'r'.
 */
var getNoNRSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsNoNRS, getExclusionsNoNRSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string, but not if followed by an 'n', 'r' or 's'.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string,
 * but not if followed by an 'n', 'r' or 's'.
 */
var getBeginEndNoNRSRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionsBeginEndNoNRS, getExclusionsBeginEndNoNRSRegex );
};

/**
 * The function building a regex for exclusion words that that should be found anywhere in a string.
 * @param {string} locale The locale
 * @returns {RegExp} The regex built with the exclusion words that that should be found anywhere in a string.
 */
var getWordPartRegex = function ( locale ) {
	return getRegex( syllableArray( locale ).exclusionWordParts, getExclusionWordPartRegex );
};

var countSyllablesInExclusionWords = function ( word, locale ) {
	var count = 0;
	var exclusionWords = syllableArray( locale ).exclusionWords;
	var foundWord = find( exclusionWords, function ( exclusionWord ) {
		return word === exclusionWord.word;
	} );
	if ( !isUndefined( foundWord ) ) {
		count = foundWord.syllables;
	}
	return count;
};

/**
 * The function counting the syllables in exclusion words.
 *
 * @param {String} word A word from the text.
 * @param {String} exclusionRegex The regex-string.
 * @param {Array} exclusionWords The list with exclusion words.
 * @returns {number} The syllable count.
 */

var countSyllablesInExclusions = function ( word, exclusionRegex, exclusionWords ) {
	var count = 0;
	for ( var i = 0; i < exclusionWords.length; i++ ) {
		var regex = new RegExp( exclusionRegex ( exclusionWords[ i ].word ), "ig" );
		var matches = word.match( regex );
		if ( matches !== null ) {
			count += ( matches.length * exclusionWords[ i ].syllables );
		}
	}
	return count;
};


var countSyllablesInExclusionsEndPlural = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsEndPluralRegex, syllableArray( locale ).exclusionsEndPlural );
};

var countSyllablesInExclusionsBeginEndNoS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsBeginEndNoSRegex, syllableArray( locale ).exclusionsBeginEndNoS );
};

var countSyllablesInExclusionsBeginNoS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsBeginNoSRegex, syllableArray( locale ).exclusionsBeginNoS );
};

var countSyllablesInExclusionsNoN = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsNoNRegex, syllableArray( locale ).exclusionsNoN );
};

var countSyllablesInExclusionsNoNS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsNoNSRegex, syllableArray( locale ).exclusionsNoNS );
};

var countSyllablesInExclusionsNoRS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsNoRSRegex, syllableArray( locale ).exclusionsNoRS );
};

var countSyllablesInExclusionsNoNR = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsNoNRRegex, syllableArray( locale ).exclusionsNoNR );
};

var countSyllablesInExclusionsBeginEndNoNR = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsBeginEndNoNRRegex, syllableArray( locale ).exclusionsBeginEndNoNR );
};

var countSyllablesInExclusionsNoNRS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsNoNRSRegex, syllableArray( locale ).exclusionsNoNRS );
};

var countSyllablesInExclusionsBeginEndNoNRS = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionsBeginEndNoNRSRegex, syllableArray( locale ).exclusionsBeginEndNoNRS );
};

var countSyllablesInCompoundWordParts = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionCompoundRegex, syllableArray( locale ).exclusionCompounds );
};

var countSyllablesInCompoundWordEnds = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionCompoundEndRegex, syllableArray( locale ).exclusionCompoundEnds );
};

var countSyllablesInExclusionWordParts = function ( word, locale ) {
	return countSyllablesInExclusions( word, getExclusionWordPartRegex, syllableArray( locale ).exclusionWordParts );
};

/**
 * Counts the number of syllables in a textstring, calls exclusionwordsfunction, basic syllable
 * counter and advanced syllable counter.
 *
 * @param {String} text The text to count the syllables from.
 * @param {String} locale The paper's locale
 * @returns {number} The syllable count
 */
module.exports = function( text, locale ) {
	var count = 0;
	var compoundRegex = getCompoundRegex( locale );
	var wordPartRegex = getWordPartRegex( locale );
	var compoundEndRegex = getCompoundEndRegex( locale );
	var exclusionsEndPluralRegex = getEndPluralRegex( locale );
	var exclusionsBeginEndNoSRegex = getBeginEndNoSRegex( locale );
	var exclusionsBeginNoSRegex = getBeginNoSRegex( locale );
	var exclusionsNoNRegex = getNoNRegex( locale );
	var exclusionsNoNSRegex = getNoNSRegex( locale );
	var exclusionsNoRSRegex = getNoRSRegex( locale );
	var exclusionsNoNRRegex = getNoNRRegex( locale );
	var exclusionsBeginEndNoNRRegex = getBeginEndNoNRRegex( locale );
	var exclusionsNoNRSRegex = getNoNRSRegex( locale );
	var exclusionsBeginEndNoNRSRegex = getBeginEndNoNRSRegex( locale );

	text = cleanText( text );
	text = text.replace( /[.]/g, " " );
	var words = getWords( text );
	forEach( words, function ( word ) {
		var countInExclusionWords = countSyllablesInExclusionWords( word, locale );
		if ( countInExclusionWords > 0 ) {
			count += countInExclusionWords;
			return;
		}

		var exclusions = [
			{
				countSyllables: countSyllablesInCompoundWordParts,
				replacementRegex: compoundRegex
			},
			{
				countSyllables: countSyllablesInCompoundWordEnds,
				replacementRegex: compoundEndRegex
			},
			{
				countSyllables: countSyllablesInExclusionWordParts,
				replacementRegex: wordPartRegex
			},
			{
				countSyllables: countSyllablesInExclusionsEndPlural,
				replacementRegex: exclusionsEndPluralRegex
			},
			{
				countSyllables: countSyllablesInExclusionsBeginEndNoS,
				replacementRegex: exclusionsBeginEndNoSRegex
			},
			{
				countSyllables: countSyllablesInExclusionsBeginNoS,
				replacementRegex: exclusionsBeginNoSRegex
			},
			{
				countSyllables: countSyllablesInExclusionsNoN,
				replacementRegex: exclusionsNoNRegex
			},
			{
				countSyllables: countSyllablesInExclusionsNoNS,
				replacementRegex: exclusionsNoNSRegex
			},
			{
				countSyllables: countSyllablesInExclusionsNoRS,
				replacementRegex: exclusionsNoRSRegex
			},
			{
				countSyllables: countSyllablesInExclusionsNoNR,
				replacementRegex: exclusionsNoNRRegex
			},
			{
				countSyllables: countSyllablesInExclusionsBeginEndNoNR,
				replacementRegex: exclusionsBeginEndNoNRRegex
			},
			{
				countSyllables: countSyllablesInExclusionsNoNRS,
				replacementRegex: exclusionsNoNRSRegex
			},
			{
				countSyllables: countSyllablesInExclusionsBeginEndNoNRS,
				replacementRegex: exclusionsBeginEndNoNRSRegex
			}
		];

		forEach( exclusions, function( exclusion ) {
			var syllableCount = exclusion.countSyllables( word, locale );
			if ( syllableCount > 0 ) {
				count += syllableCount;

				word = replaceWord( word, exclusion.replacementRegex )
			}
		} );
	} );


/*
	count += countExclusionSyllables( text, locale );

	text = removeExclusionWords( text, locale );

	count += countBasicSyllables( text );
	//console.log( count );
	count += countAdvancedSyllables( text, "add", locale );
	//console.log( count );
	count -= countAdvancedSyllables( text, "subtract", locale );
	//console.log( count );

	*/
	console.log( count );
	return count;

};

