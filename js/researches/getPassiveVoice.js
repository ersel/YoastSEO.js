var getSentences = require( "../stringProcessing/getSentences.js" );
var arrayToRegex = require( "../stringProcessing/createRegexFromArray.js" );
var stripSpaces = require( "../stringProcessing/stripSpaces.js" );
var stripHTMLTags = require( "../stringProcessing/stripHTMLTags.js" ).stripFullTags;
var matchWordInSentence = require( "../stringProcessing/matchWordInSentence.js" );
var normalizeSingleQuotes = require( "../stringProcessing/quotes.js" ).normalizeSingle;
var getIndicesOfList = require( "../stringProcessing/indices" ).getIndicesOfList;
var filterIndices = require( "../stringProcessing/indices" ).filterIndices;
var sortIndices = require( "../stringProcessing/indices" ).sortIndices;
var getLanguage = require( "../helpers/getLanguage.js" );

// English.
var nonverbEndingEd = require( "./english/passivevoice-english/non-verb-ending-ed.js" )();
var determiners = require( "./english/passivevoice-english/determiners.js" )();
var auxiliaries = require( "./english/passivevoice-english/auxiliaries.js" )();
var irregulars = require( "./english/passivevoice-english/irregulars.js" )();
var stopwords = require( "./english/passivevoice-english/stopwords.js" )();

// German.
var getSubSentencesGerman = require( "./german/getSubSentences.js" );
var determinePassivesGerman = require( "./german/determinePassives.js" );

var filter = require( "lodash/filter" );
var isUndefined = require( "lodash/isUndefined" );
var forEach = require( "lodash/forEach" );
var includes = require( "lodash/includes" );

var auxiliaryRegex = arrayToRegex( auxiliaries );
var verbEndingInIngRegex = /\w+ing($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var regularVerbsRegex = /\w+ed($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;

var ingExclusionArray = [ "king", "cling", "ring", "being" ];
var irregularExclusionArray = [ "get", "gets", "getting", "got", "gotten" ];

/**
 * Gets active verbs (ending in ing) to determine sentence breakers.
 *
 * @param {string} sentence The sentence to get the active verbs from.
 * @returns {Array} The array with valid matches.
 */
var getVerbsEndingInIng = function( sentence ) {
	// Matches the sentences with words ending in ing
	var matches = sentence.match( verbEndingInIngRegex ) || [];

	// Filters out words ending in -ing that aren't verbs.
	return filter( matches, function( match ) {
		return ! includes( ingExclusionArray, stripSpaces( match ) );
	} );
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
	var auxiliaryIndices = getIndicesOfList( sentence, auxiliaries );

	var stopwordIndices = getIndicesOfList( sentence, stopwords );
	stopwordIndices = filterIndices( stopwordIndices );

	var ingVerbs = getVerbsEndingInIng( sentence );
	var ingVerbsIndices = getIndicesOfList( sentence, ingVerbs );

	// Concat all indices arrays and sort them.
	var indices = [].concat( auxiliaryIndices, stopwordIndices, ingVerbsIndices );
	return sortIndices( indices );
};

/**
 * Gets the subsentences from a sentence by determining sentence breakers.
 *
 * @param {string} sentence The sentence to split up in subsentences.
 * @param {string} language The language to use for determining how to get subsentences.
 * @returns {Array} The array with all subsentences of a sentence that have an auxiliary.
 */
var getSubsentences = function( sentence, language ) {
	var subSentences = [];

	switch( language ) {
		case "de":
			subSentences = getSubSentencesGerman( sentence );
			break;
		case "en":
		default:
			sentence = normalizeSingleQuotes( sentence );

			// First check if there is an auxiliary word in the sentence.
			if( sentence.match( auxiliaryRegex ) !== null ) {
				var indices = getSentenceBreakers( sentence );

				// Get the words after the found auxiliary.
				for ( var i = 0; i < indices.length; i++ ) {
					var endIndex = sentence.length;
					if ( ! isUndefined( indices[ i + 1 ] ) ) {
						endIndex = indices[ i + 1 ].index;
					}

					// Cut the sentence from the current index to the endIndex (start of next breaker, of end of sentence).
					var subSentence = stripSpaces( sentence.substr( indices[ i ].index, endIndex - indices[ i ].index ) );
					subSentences.push( subSentence );
				}
			}

			// If a subsentence doesn't have an auxiliary, we don't need it, so it can be filtered out.
			subSentences = filter( subSentences, function( subSentence ) {
				return subSentence.match( auxiliaryRegex ) !== null;
			} );
			break;
	}

	return subSentences;
};

/**
 * Gets regular passive verbs.
 *
 * @param {string} subSentence The sub sentence to check for passive verbs.
 * @returns {Array} The array with all matched verbs.
 */
var getRegularVerbs = function( subSentence ) {
	// Matches the sentences with words ending in ed
	var matches = subSentence.match( regularVerbsRegex ) || [];

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
 * @param {string} subSentence The subsentence to check for the word 'having' and a verb
 * @param {Array} verbs The array with verbs to check.
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isHavingException = function( subSentence, verbs ) {
	// Match having with a verb directly following it. If so it is active.
	var indexOfHaving = subSentence.indexOf( "having" );

	if ( indexOfHaving > -1 ) {
		var verbIndices = getIndicesOfList( subSentence, verbs );

		if ( ! isUndefined( verbIndices[ 0 ] ) && ! isUndefined( verbIndices[ 0 ].index ) ) {
			// 7 is the number of characters of the word 'having' including space.
			return verbIndices[ 0 ].index  <= subSentence.indexOf( "having" ) + 7;
		}
	}
	return false;
};

/**
 * Match 'left'. If left is preceeded by `a` or `the`, it isn't a verb.
 *
 * @param {string} subSentence The subsentence to check for the word 'left'
 * @param {Array} verbs The array with verbs to check.
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isLeftException = function( subSentence, verbs ) {
	// Matches left with the or a preceeding.
	var matchLeft = subSentence.match( /(the|a)\sleft/ig ) || [];
	return matchLeft.length > 0 && verbs[ 0 ].match === "left";
};

/**
 * If the word 'fit' is preceeded by a determiner, it shouldn't be marked as active.
 *
 * @param {string} subSentence The subsentence to check for the word 'fit'
 * @returns {boolean} True if it is an exception, false if it is not.
 */
var isFitException = function( subSentence ) {
	var indexOfFit = subSentence.indexOf( "fit" );
	if ( indexOfFit > -1 ) {
		var subString = subSentence.substr( 0, indexOfFit );
		var determinerIndices = filterWordListInSentence( determiners, subString );
		return determinerIndices.length > 1;
	}
	return false;
};

/**
 * Gets the exceptions. Some combinations shouldn't be marked as passive, so we need to filter them out.
 *
 * @param {string} subSentence The subsentence to check for exceptions.
 * @param {array} verbs The array of verbs, used to determine exceptions.
 * @returns {boolean} Wether there is an exception or not.
 */
var getExceptions = function( subSentence, verbs ) {
	if ( isHavingException( subSentence, verbs ) ) {
		return true;
	}

	if ( isLeftException( subSentence, verbs ) ) {
		return true;
	}

	if ( isFitException( subSentence ) ) {
		return true;
	}

	return false;
};

/**
 * Checks the subsentence for any passive verb.
 *
 * @param {string} subSentence The subsentence to check for passives.
 * @returns {boolean} True if passive is found, false if no passive is found.
 */
var determinePassives = function( subSentence, language ) {
	switch( language ) {
		case "de":
			return determinePassivesGerman( subSentence );
			break;
		case "en":
		default:
			var regularVerbs = getRegularVerbs( subSentence );
			var irregularVerbs = getIrregularVerbs( subSentence );
			var verbs = regularVerbs.concat( irregularVerbs );

			// Checks for exceptions in the found verbs.
			var exceptions = getExceptions( subSentence, verbs );

			// If there is any exception, this subsentence cannot be passive.
			return verbs.length > 0 && exceptions === false;
	}
};

/**
 * Determines the number of passive sentences in the text.
 *
 * @param {Paper} paper The paper object to get the text from.
 * @returns {object} The number of passives found in the text and the passive sentences.
 */
module.exports = function( paper ) {
	var text = paper.getText();
	var locale = paper.getLocale();
	var language = getLanguage( locale );
	var sentences = getSentences( text );
	var passiveSentences = [];

	// Get subsentences for each sentence.
	forEach( sentences, function( sentence ) {
		var strippedSentence = stripHTMLTags( sentence );

		var subSentences = getSubsentences( strippedSentence, language );

		var passive = false;
		forEach( subSentences, function( subSentence ) {

			passive = passive || determinePassives( subSentence, language );
		} );

		if ( passive === true ) {
			passiveSentences.push( sentence );
		}
	} );

	return {
		total: sentences.length,
		passives: passiveSentences,
	};
};
