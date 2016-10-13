var getWords = require( "../../../stringProcessing/getWords.js" );

var regexFunction = require( "../../../../js/researches/english/passivevoice-english/participleRegexes.js" )();
var regularParticiples = regexFunction.regularParticiples;
var irregularParticiples = regexFunction.irregularParticiples;

var EnglishParticiple = require( "../EnglishParticiple.js" );

var forEach = require( "lodash/forEach" );

/**
 * Creates EnglishParticiple Objects for the participles found in a sentence.
 *
 * @param {string} sentence The sentence to finds participles in.
 * @returns {Array} The array with EnglishParticiple Objects.
 */
module.exports = function( sentence ) {
	var words = getWords( sentence );

	var foundParticiples = [];

	forEach( words, function( word ) {
		if( regularParticiples( word ).length !== 0 ) {
			foundParticiples.push( new EnglishParticiple( word, sentence, "", "regular" ) );
			return;
		}
		if( irregularParticiples( word ).length !== 0 ) {
			foundParticiples.push( new EnglishParticiple( word, sentence, "", "irregular" ) );
			return;
		}
	} );
	return foundParticiples;
};
