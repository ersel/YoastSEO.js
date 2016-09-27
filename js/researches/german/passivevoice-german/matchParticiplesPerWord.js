var getWords = require( "../../../stringProcessing/getWords.js" );
var regexFunction = require( "../../../../js/researches/german/passivevoice-german/regex.js" )();
var verbsBeginningWithErVerEntBeZer = regexFunction.verbsBeginningWithErVerEntBeZer;
var verbsBeginningWithGe = regexFunction.verbsBeginningWithGe;
var verbsWithGeInMiddle = regexFunction.verbsWithGeInMiddle;
var verbsWithErVerEntBeZerInMiddle = regexFunction.verbsWithErVerEntBeZerInMiddle;
var verbsEndingWithIert = regexFunction.verbsEndingWithIert;

var forEach = require( "lodash/forEach" );

var matchParticiplesPerWord = function( sentence ) {
	var words = getWords( sentence );

	var geAtBeginningMatches = [];
	forEach( words, function( word ) {
		if ( verbsBeginningWithGe( word ).length !== 0 ) {
			geAtBeginningMatches.push( word );
		}
	} );

	var geInMiddleMatches = [];
	forEach( words, function( word ) {
		if ( verbsWithGeInMiddle( word ).length !== 0 ) {
			geInMiddleMatches.push( word );
		}
	} );

	var erVerEntBeZerAtBeginningMatches = [];
	forEach( words, function( word ) {
		if ( verbsBeginningWithErVerEntBeZer( word ).length !== 0 ) {
			erVerEntBeZerAtBeginningMatches.push( word );
		}
	} );

	var erVerEntBeZerInMiddleMatches = [];
	forEach( words, function( word ) {
		if ( verbsWithErVerEntBeZerInMiddle( word ).length !== 0 ) {
			erVerEntBeZerInMiddleMatches.push( word );
		}
	} );

	var verbsEndingWithIertMatches = [];
	forEach( words, function( word ) {
		if ( verbsEndingWithIert( word ).length !== 0 ) {
			verbsEndingWithIertMatches.push( word );
		}
	} );

	return erVerEntBeZerInMiddleMatches.concat( geAtBeginningMatches, geInMiddleMatches,
		erVerEntBeZerAtBeginningMatches, verbsEndingWithIertMatches );
};

module.exports = function() {
	return matchParticiplesPerWord;
};
