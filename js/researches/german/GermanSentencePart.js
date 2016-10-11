var SentencePart = require( "../../values/SentencePart.js" );

var getParticiples = require( "./passivevoice-german/getParticiples.js");

var GermanSentencePart = function( sentencePartText ) {
	SentencePart.call( this, sentencePartText );
};

require( "util" ).inherits( GermanSentencePart, SentencePart );

GermanSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText() );
};

module.exports = GermanSentencePart;
