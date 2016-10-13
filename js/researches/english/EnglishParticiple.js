var Participle = require( "../../values/Participle.js" );

var getIndices = require( "../../stringProcessing/indices.js" ).getIndices;
var nonVerbsEndingEd = require( "./passivevoice-english/non-verb-ending-ed.js" )();
var matchDeterminers = require( "../english/passivevoice-english/participleRegexes.js" )().determiners;

var irregularExclusionArray = [ "get", "gets", "getting", "got", "gotten" ];

var forEach = require( "lodash/forEach" );
var includes = require( "lodash/includes" );
var isUndefined = require( "lodash/isUndefined" );
var isEmpty = require( "lodash/isEmpty" );

var EnglishParticiple = function( participle, sentencePart, auxiliary, type ) {
	Participle.call( this, participle, sentencePart, auxiliary, type );
	this.isException();
};

require( "util" ).inherits( EnglishParticiple, Participle );

// Todo: hoe korter?
EnglishParticiple.prototype.isException = function() {
	var isPassive = ! this.isNonVerbEndingEd() && ! this.hasRidException() && ! this.hasHavingException() && ! this.hasLeftException() && ! this.hasFitException();
	this.setSentencePartPassiveness( isPassive );
};

/**
 * Checks whether a found participle is in the nonVerbsEndingEd list.
 * If a word is in the nonVerbsEndingEd list, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is in the nonVerbsEndingEd list, otherwise returns false.
 */
// Todo: Only when type = regular?
EnglishParticiple.prototype.isNonVerbEndingEd = function() {
	var participle = this.getParticiple();
	return includes( nonVerbsEndingEd, participle );
};

/**
 * Checks whether the participle is 'rid' in combination with 'get', 'gets', 'getting', 'got' or 'gotten'.
 * If 'rid' appears in combination with 'get', 'gets', 'getting', 'got' or 'gotten', it is not passive.
 *
 * @returns {boolean} Returns true if 'rid' is found in combination with 'get', 'gets', 'getting', 'got' or 'gotten',
 * otherwise returns false.
 */
// Todo: Only when type = irregular?
EnglishParticiple.prototype.hasRidException = function() {
	var participle = this.getParticiple();
	var auxiliary = this.getAuxiliary();
	if ( participle === "rid" ) {
		return includes( irregularExclusionArray, auxiliary );
	}
	return false;
};

/**
 * Checks whether the participle is directly preceded by 'having'.
 * If this is the case, the sentence part is not passive.
 *
 * @returns {boolean} Returns true if having is directly preceding the participle, otherwise returns false.
 */
// Todo: ook met (aangepaste) isPrecededByDeterminer?
EnglishParticiple.prototype.hasHavingException = function() {
	var sentencePart = this.getSentencePart();
	var isPassiveException = false;

	var indexOfHaving = sentencePart.indexOf( "having" );
	if ( indexOfHaving > -1 ) {
		var participleIndex = getIndices( this.getParticiple(), sentencePart );
		// Todo: klopt dit met [ 0 ]?
		if ( ! isUndefined( participleIndex[ 0 ] ) && ! isUndefined( participleIndex[ 0 ].index ) ) {
			// 7 is the number of characters of the word 'having' including space.
			isPassiveException = participleIndex[ 0 ].index  <= sentencePart.indexOf( "having" ) + 7;
			return isPassiveException;
		}
	}
	return isPassiveException;
};
// /**
//  * Checks whether the participle is 'left', and, if so, if it is directly preceded by 'the' or 'a'.
//  * If 'left' is directly preceded by 'the' or 'a' it is not a verb, hence the sentence part is not passive.
//  *
//  * @returns {boolean} Returns true if 'left' is found preceded by 'the' or 'a', otherwise returns false.
//  */
// // Todo: Only when type = irregular?
// EnglishParticiple.prototype.hasLeftException = function() {
// 	if ( this.getParticiple() === "left" ) {
// 		var matchLeft = this.getSentencePart().match( /(the|a)\sleft/ig ) || [];
// // Todo: hoe naar boolean?
// 		return ! isEmpty( matchLeft )
// 	}
// 	return false;
// };

// Todo: naar andere file?
var isPrecededByDeterminer = function( participle, word, sentencePart ) {
	if ( participle === word ) {
		var indexOfFit = sentencePart.indexOf( word );
		var determiners = matchDeterminers( sentencePart );
		if ( ! isEmpty( determiners ) ) {
			var determinerEndIndices = [];
			forEach( determiners, function( determiner ) {
				var determinerEndIndex = determiner.index + determiner.match.length;
				determinerEndIndices.push( determinerEndIndex );
			} );
			return includes( determinerEndIndices, indexOfFit );
		}
		return false;
	}
	return false;
};

/**
 * Checks whether the participle is 'left', and, if so, if it is directly preceded by a determiner.
 * If 'left' is directly preceded by a determiner it is not a verb, hence the sentence part is not passive.
 *
 * @returns {boolean} Returns true if 'left' is found preceded by a determiner, otherwise returns false.
 */
// Todo: Only when type = irregular?
EnglishParticiple.prototype.hasLeftException = function() {
	return isPrecededByDeterminer( this.getParticiple(), "left", this.getSentencePart() );
};

/**
 * Checks whether the participle is 'fit', and, if so, if it is directly preceded by a determiner.
 * If 'fit' is directly preceded by a determiner it is not a verb, hence the sentence part is not passive.
 *
 * @returns {boolean} Returns true if 'fit' is found preceded by a determiner, otherwise returns false.
 */
// Todo: Only when type = irregular?
EnglishParticiple.prototype.hasFitException = function() {
	return isPrecededByDeterminer( this.getParticiple(), "fit", this.getSentencePart() );
};

module.exports = EnglishParticiple;
