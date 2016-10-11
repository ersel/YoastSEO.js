var arrayToRegex = require( "../../stringProcessing/createRegexFromArray.js" );
var matchWordInSentence = require( "../../stringProcessing/matchWordInSentence.js" );
var stripSpaces = require( "../../stringProcessing/stripSpaces.js" );
var removePunctuation = require( "../../stringProcessing/removePunctuation.js" );
var indices = require( "../../stringProcessing/indices.js" );
var auxiliaries = require( "./passivevoice-german/auxiliaries.js" )();
var irregularParticiples = require( "./passivevoice-german/irregulars.js" )();
var exceptionsParticiplesActive = require( "./passivevoice-german/exceptionsParticiplesActive.js" )();
var getParticiples = require( "./passivevoice-german/getParticiples.js" );

var forEach = require( "lodash/forEach" );
var map = require( "lodash/map" );
var includes = require( "lodash/includes" );
var filter = require( "lodash/filter" );

var exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;

var auxiliaryRegex = arrayToRegex( auxiliaries );

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
	var matches = getParticiples( subSentence );
	//todo only temp.
	var textMatches = map( matches, "_participle" );

	if ( textMatches.length !== 0 ) {
		var filteredParticiples = filterNonParticiples( textMatches );
	}
	return indices.getIndicesOfList( subSentence, filteredParticiples );
};

/**
 * Gets the indices of participles.
 *
 * @param {string} subSentence The subsentence to find the participles' indices in.
 * @returns {Array} The array with participles and their index.
 */
var getParticipleIndices = function( subSentence ) {
	var irregularsIndices = indices.getIndicesOfList( subSentence, irregularParticiples );
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
	var habenSeinIndices = indices.getIndicesOfList( subSentence, [ "haben", "sein" ] );
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

module.exports = function( subSentence ) {
	var passive = false;
	if( subSentence.match( auxiliaryRegex ) === null ) {
		return passive;
	}
	passive = passive || isFollowedByHabenSein( subSentence );

	return passive;
};
