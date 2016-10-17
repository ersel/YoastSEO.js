var getWords = require( "../../../stringProcessing/getWords.js" );
var regexFunction = require( "./participleRegexes.js" )();
var participlesBeginningWithErVerEntBeZerHer = regexFunction.participlesBeginningWithErVerEntBeZer;
var participlesBeginningWithGe = regexFunction.participlesBeginningWithGe;
var participlesWithGeInMiddle = regexFunction.participlesWithGeInMiddle;
var participlesWithErVerEntBeZerHerInMiddle = regexFunction.participlesWithErVerEntBeZerInMiddle;
var participlesEndingWithIert = regexFunction.participlesEndingWithIert;
var irregularParticiples = regexFunction.irregularParticiples;

var GermanParticiple = require( "../GermanParticiple.js" );

var forEach = require( "lodash/forEach" );

/**
 * Creates GermanParticiple Objects for the participles found in a sentence.
 *
 * @param {string} sentence The sentence to finds participles in.
 * @returns {Array} The array with GermanParticiple Objects.
 */
module.exports = function( sentence ) {
	var words = getWords( sentence );
	var foundParticiples = [];
	forEach( words, function( word ) {
		if( participlesBeginningWithGe( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "ge at beginning" ) );
			return;
		}
		if ( participlesWithGeInMiddle( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "ge in the middle" ) );
			return;
		}
		if ( participlesBeginningWithErVerEntBeZerHer( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "er/ver/ent/be/zer/her at beginning" ) );
			return;
		}
		if ( participlesWithErVerEntBeZerHerInMiddle( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "er/ver/ent/be/zer/her in the middle" ) );
			return;
		}
		if ( participlesEndingWithIert( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "iert at the end" ) );
		}
		if ( irregularParticiples( word ).length !== 0 ) {
			foundParticiples.push( new GermanParticiple( word, sentence, "", "irregular" ) );
		}
	} );

	return foundParticiples;
};
