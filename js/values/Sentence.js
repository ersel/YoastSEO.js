var getSubSentences = require( "../" );

var defaultAttributes = {
	locale: "en_US",
};

/**
 *
 * @param sentence
 * @param locale
 * @constructor
 */
var Sentence = function( sentence, locale ) {
	this._sentence = sentence;
	this._locale = locale || defaultAttributes.locale;
};

Sentence.prototype.getSubSentences = function() {

};
