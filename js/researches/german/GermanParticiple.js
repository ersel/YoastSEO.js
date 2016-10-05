Participle = require( "../../values/Participle.js" );

var getIndices = require( "../../stringProcessing/indices.js" ).getIndices;
var getIndicesOfList = require( "../../stringProcessing/indices.js" ).getIndicesOfList;

var forEach = require( "lodash/forEach" );
var includes = require( "lodash/includes" );
var map = require( "lodash/map" );

var GermanParticiple = function(  participle, subSentence, auxiliary, type ) {
	Participle.call( this, participle, subSentence, auxiliary, type );
	this.hasException();
};

require( "util" ).inherits( GermanParticiple, Participle );

GermanParticiple.prototype.hasException = function() {
	this.setPassive( ! this.hasHabenSeinException() );
};

/**
 * Checks whether a participle is followed by 'haben' or 'sein'.
 * If a participle is followed by one of these, the sentence is not passive.
 *
 * @returns {boolean} Returns true if passive, otherwise returns false.
 */
GermanParticiple.prototype.hasHabenSeinException = function() {
	var participleIndices = getIndices( this.getParticiple(), this.getSubSentence() );
	var habenSeinIndices = getIndicesOfList( this.getSubSentence(), [ "haben", "sein" ] );
	var isPassiveException = false;
	if( participleIndices.length > 0 ) {
		if ( habenSeinIndices.length === 0 ) {
			return isPassiveException;
		}
		habenSeinIndices = map( habenSeinIndices, "index" );
		forEach( participleIndices, function( participleIndex ) {
			isPassiveException = includes( habenSeinIndices, participleIndex.index + participleIndex.match.length + 1 );
		} );
	}
	return isPassiveException;
};

module.exports = GermanParticiple;
