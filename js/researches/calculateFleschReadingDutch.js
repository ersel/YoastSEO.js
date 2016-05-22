/** @module analyses/calculateFleschReading */

var cleanText = require( "../stringProcessing/cleanText.js" );
var stripNumbers = require( "../stringProcessing/stripNumbers.js" );
var stripHTMLTags = require( "../stringProcessing/stripHTMLTags.js" );
var countSentences = require( "../stringProcessing/countSentences.js" );
var countWords = require( "../stringProcessing/countWords.js" );
var countSyllables = require( "../stringProcessing/countSyllables.js" );

/**
 * This calculates the fleschreadingscore for a given text in Dutch
 * The formula used:
 * 206.84 - 0.77( #syllables in 100 words ) - 0.93( total words/total sentences ).
 *
 * @param {object} paper The paper containing the text
 * @returns {number} the score of the fleschreading test
 */
module.exports = function( paper ) {
	var text = paper.getText();
	var locale = paper.getLocale();
	if ( text === "" ) {
		return 0;
	}

	text = cleanText( text );
	text = stripHTMLTags( text );
	var wordCount = countWords( text );

	text = stripNumbers( text );
	var sentenceCount = countSentences( text );
	var totalSyllables = countSyllables( text, locale );
	var syllableCountPer100 = ( totalSyllables / ( wordCount / 100 ) );

	var score = 206.84 - ( 0.77 * ( syllableCountPer100 ) ) - ( 0.93 * ( wordCount / sentenceCount ) );

	return score.toFixed( 1 );
};
