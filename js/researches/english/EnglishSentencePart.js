var SentencePart = require( "../../values/SentencePart.js" );

// var getParticiples = require( "./passivevoice-english/getParticiples.js" );

/**
 * Creates a German specific sentence part.
 * @param {string} sentencePartText The text from the sentence part.
 * @constructor
 */
var EnglishSentencePart = function( sentencePartText ) {
	SentencePart.call( this, sentencePartText );
};

require( "util" ).inherits( EnglishSentencePart, SentencePart );

/**
 * Returns the participles found in the sentence part..
 * @returns {Array|*}
 */
/*
EnglishSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText() );
};
*/
module.exports = EnglishSentencePart;
