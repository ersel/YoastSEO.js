
var Participle = function( participle, subSentence, auxiliary, type ) {
	this._participle = participle;
	this._subSentence = subSentence;
	this._type = type;
	this._auxiliary = auxiliary;
	this._determinesSubsentenceIsPassive = true;
};

/**
 * Returns the participle.
 * @returns {String} The participle.
 */
Participle.prototype.getParticiple = function() {
	return this._participle;
};

/**
 * Returns the subsentence.
 * @returns {String} The subsentence.
 */
Participle.prototype.getSubSentence = function() {
	return this._subSentence;
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
Participle.prototype.determineSubsentenceIsPassive = function() {
	return this._determinesSubsentenceIsPassive;
};

/**
 * Determines if the sentence is passive or not.
 * @param {boolean} passive Whether the subsentence is passive.
 */
Participle.prototype.setSubsentencePassiveness = function( passive ) {
	this._determinesSubsentenceIsPassive = passive;
};

module.exports = Participle;
