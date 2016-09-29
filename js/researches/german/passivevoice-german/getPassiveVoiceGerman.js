var getSentences = require( "../../../stringProcessing/getSentences.js" );
var arrayToRegex = require( "../../../stringProcessing/createRegexFromArray.js" );
var splitSentences = require( "./splitSentences.js" );
var stripHTMLTags = require( "../../../stringProcessing/stripHTMLTags.js" ).stripFullTags;
var matchWordInSentence = require( "../../../stringProcessing/matchWordInSentence.js" );
var stripSpaces = require( "../../../stringProcessing/stripSpaces.js" );
var removePunctuation = require( "../../../stringProcessing/removePunctuation.js" );
var auxiliaries = require( "./auxiliaries.js" )();
var irregularParticiples = require( "./irregulars.js" )();
var exceptionsParticiplesActive = require( "./exceptionsParticiplesActive.js" )();
var matchParticiplesPerWord = require( "./matchParticiplesPerWord.js" )();

var forEach = require( "lodash/forEach" );
var map = require( "lodash/map" );
var includes = require( "lodash/includes" );
var filter = require( "lodash/filter" );

var exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;

var auxiliaryRegex = arrayToRegex( auxiliaries );

/**
 * Returns the indices of a string in a sentence. If it is found multiple times, it will return multiple indices.
 *
 * @param {string} part The part to find in the sentence.
 * @param {string} sentence The sentence to check for parts.
 * @returns {Array} All indices found.
 */
var getIndicesOf = function( part, sentence ) {
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
};

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
 * Filters out non-participles that look like participles.
 *
 * @param {Array} matches The array with matched participles.
 * @returns {Array} The filtered array with participles.
 */
var filterNonParticiples = function( matches ) {
	return filter( matches, function( match ) {
		match = stripSpaces( match );
		match = removePunctuation( match );
		return match.match( exceptionsRegex ) !== null || ! includes( exceptionsParticiplesActive, match );
	} );
};

/**
 * Finds participles and their index in subsentences.
 *
 * @param {string} subSentence The subsentence to find participles in.
 * @returns {Array} The filtered array with participles and their index.
 */
var getRegularParticipleIndices = function( subSentence ) {
	var matches = matchParticiplesPerWord( subSentence );
	if ( matches.length !== 0 ) {
		var filteredParticiples = filterNonParticiples( matches );
	}
	return matchArray( subSentence, filteredParticiples );
};

/**
 * Gets the indices of participles.
 *
 * @param {string} subSentence The subsentence to find the participles' indices in.
 * @returns {Array} The array with participles and their index.
 */
var getParticipleIndices = function( subSentence ) {
	var irregularsIndices = matchArray( subSentence, irregularParticiples );
	var participleIndices = getRegularParticipleIndices( subSentence );
	return irregularsIndices.concat( participleIndices );
};

/**
 * Checks whether a participle is followed by 'haben' or 'sein'.
 * If a participle is followed by one of these, the sentence is not passive.
 *
 * @param {string} subSentence The subsentence to find a passive irregular in.
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */
var isFollowedByHabenSein = function( subSentence ) {
	var participleIndices = getParticipleIndices( subSentence );
	var habenSeinIndices = matchArray( subSentence, [ "haben", "sein" ] );
	var followedByHabenSein = false;
	if( participleIndices.length > 0 ) {
		if ( habenSeinIndices.length === 0 ) {
			return true;
		}
		var indicesToMatch = map( habenSeinIndices, "index" );
		forEach( participleIndices, function( index ) {
			followedByHabenSein = followedByHabenSein || ! includes( indicesToMatch, index.index + index.match.length + 1 );
		} );
	}
	return followedByHabenSein;
};

/**
 * Determines whether a subsentence is passive.
 *
 * @param {string} subSentence The subsentence to determine voice for.
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */

var determinePassives = function( subSentence ) {
	var passive = false;
	if( subSentence.match( auxiliaryRegex ) === null ) {
		return passive;
	}
	passive = passive || isFollowedByHabenSein( subSentence );

	return passive;
};

module.exports = function( paper ) {
	var text = paper.getText();
	var sentences = getSentences( text );
	var passiveSentences = [];

	// Get subsentences for each sentence.
	forEach( sentences, function( sentence ) {
		var strippedSentence = stripHTMLTags( sentence );

		var subSentences = splitSentences( strippedSentence );
		var passive = false;

		forEach( subSentences, function( subSentence ) {
			passive = passive || determinePassives( subSentence );
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
