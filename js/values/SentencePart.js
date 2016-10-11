var defaults = require( "lodash/defaults" );

/**
 *
 * @param {string} sentencePartText The text in the sentence part.
 * @param {string} locale The locale used for this sentence part.
 * @constructor
 */
var SentencePart = function( sentencePartText, locale ) {
	this._sentencePartText = sentencePartText;
	this._locale = locale;
	this._isPassive = false;
};

/**
 *
 * @returns {*}
 */
SentencePart.prototype.getSentencePartText = function() {
	return this._sentencePartText;
};

SentencePart.prototype.isPassive = function() {
	return this._isPassive;
};

SentencePart.prototype.getLocale = function() {
	return this._locale;
};

// todo add check if already passive.
SentencePart.prototype.setPassive = function( passive ) {
	this._isPassive = passive;
};

module.exports = SentencePart;
