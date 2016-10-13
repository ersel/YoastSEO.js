var arrayToRegex = require( "../../../stringProcessing/createRegexFromArray.js" );

var participlesBeginningWithGeRegex = /^((ge)\S+t($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>]))/ig;
var participlesBeginningWithErVerEntBeZerRegex = /^((be|ent|er|her|ver|zer)\S+t($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>]))/ig;
var participlesWithGeInMiddleRegex = /(ab|an|auf|aus|vor|wieder|zurück)(ge)\S+t($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var participlesWithErVerEntBeZerInMiddleRegex = /(ab|an|auf|aus|vor|wieder|zurück)(be|ent|er|her|ver|zer)\S+t($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var participlesEndingWithIertRegex = /\S+iert($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])/ig;
var irregulars = require( "./irregulars" )();

var participlesBeginningWithGe = function( word ) {
	return word.match( participlesBeginningWithGeRegex ) || [];
};

var participlesBeginningWithErVerEntBeZer = function( word ) {
	return word.match( participlesBeginningWithErVerEntBeZerRegex ) || [];
};

var participlesWithGeInMiddle = function( word ) {
	return word.match( participlesWithGeInMiddleRegex ) || [];
};

var participlesWithErVerEntBeZerInMiddle = function( word ) {
	return word.match( participlesWithErVerEntBeZerInMiddleRegex ) || [];
};

var participlesEndingWithIert = function( word ) {
	return word.match( participlesEndingWithIertRegex ) || [];
};

var exceptions = function( word ) {
	return word.match( exceptionsRegex ) || [];
};

var irregularParticiples = function( word ) {
	var irregularRegex =  arrayToRegex( irregulars );
	return word.match( irregularRegex ) || [];
};

module.exports = function() {
	return {
		participlesBeginningWithGe: participlesBeginningWithGe,
		participlesBeginningWithErVerEntBeZer: participlesBeginningWithErVerEntBeZer,
		participlesWithGeInMiddle: participlesWithGeInMiddle,
		participlesWithErVerEntBeZerInMiddle: participlesWithErVerEntBeZerInMiddle,
		participlesEndingWithIert: participlesEndingWithIert,
		exceptions: exceptions,
		irregularParticiples: irregularParticiples,
	};
};
