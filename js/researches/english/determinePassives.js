var nonverbEndingEd = require( "./passivevoice-english/non-verb-ending-ed.js" )();
var matchWordInSentence = require( "../../stringProcessing/matchWordInSentence.js" );
var getIndicesOfList = require( "../../stringProcessing/indices" ).getIndicesOfList;
var regularVerbsRegex = /\w+ed($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var irregularExclusionArray = [ "get", "gets", "getting", "got", "gotten" ];
var determiners = require( "./passivevoice-english/determiners.js" )();
var irregulars = require( "./passivevoice-english/irregulars.js" )();
var stripSpaces = require( "../../stringProcessing/stripSpaces.js" );
var getParticiples = require( "./passivevoice-english/getParticiples.js" );

var filter = require( "lodash/filter" );
var forEach = require( "lodash/forEach" );
var includes = require( "lodash/includes" );
var isUndefined = require( "lodash/isUndefined" );

/**
 * Determines whether a sentence part is passive.
 *
 * @param {string} subSentence The sentence part to determine voice for.
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */

module.exports = function( subSentence ) {
	var participles = getParticiples( subSentence );
	var passive = false;
	forEach( participles, function( participle ) {
		if ( participle.determinesSentencePartIsPassive() ) {
			passive = true;
		}
	} );
	return passive;
};
