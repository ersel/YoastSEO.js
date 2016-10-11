
var Participle = function( participle, sentencePart, auxiliary, type ) {
	this._participle = participle;
	this._sentencePart = sentencePart;
	this._type = type;
	this._auxiliary = auxiliary;
	this._determinesSentencePartIsPassive = true;
};

/**
 * Returns the participle.
 * @returns {String} The participle.
 */
Participle.prototype.getParticiple = function() {
	return this._participle;
};

/**
 * Returns the sentence part.
 * @returns {String} The sentence part.
 */
Participle.prototype.getSentencePart = function() {
	return this._sentencePart;
};

/**
 * Returns the type.
 * @returns {String} The type.
 */
Participle.prototype.getType = function() {
	return this._type;
};

/**
 * Returns the auxiliary.
 * @returns {String} The auxiliary.
 */
Participle.prototype.getAuxiliary = function() {
	return this._auxiliary;
};

/**
 * Returns if the participle is passive or not.
 * @returns {boolean} True if it is passive.
 */
Participle.prototype.determinesSentencePartIsPassive = function() {
	return this._determinesSentencePartIsPassive;
};

/**
 * Determines if the sentence is passive or not.
 * @param {boolean} passive Whether the sentence part is passive.
 */
Participle.prototype.setSentencePartPassiveness = function( passive ) {
	this._determinesSentencePartIsPassive = passive;
};

module.exports = Participle;
