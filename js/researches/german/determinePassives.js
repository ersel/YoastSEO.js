var arrayToRegex = require( "../../stringProcessing/createRegexFromArray.js" );
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
 * Determines whether a sentence part is passive.
 *
 * @param {string} sentencePart The sentence part to determine voice for.
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */

module.exports = function( sentencePart ) {
	var passive = false;
	if (sentencePart.match( auxiliaryRegex ) === null ) {
		return passive;
	}
	var participles = getParticiples( sentencePart );
	forEach( participles, function( participle ) {
		if ( participle.determinesSentencePartIsPassive() ) {
			passive = true;
		}
	} );
	return passive;
};
