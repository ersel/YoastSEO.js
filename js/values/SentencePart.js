var defaults = require( "lodash/defaults" );

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

// todo add check if already passive.
SentencePart.prototype.setPassive = function( passive ) {
	this._isPassive = passive;
};

module.exports = SentencePart;
