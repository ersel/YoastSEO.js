var passiveVoiceAssessment = require( "../../js/assessments/passiveVoiceAssessment.js" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();
var Mark = require( "../../js/values/Mark.js" );

var paper = new Paper();
describe( "An assessment for scoring passive voice.", function() {
	it( "scores 1 passive sentence - 5%", function() {
		var assessment = passiveVoiceAssessment.getResult( paper, Factory.buildMockResearcher( {total: 20, passives: [ 1 ]} ), i18n );
		expect( assessment.getScore() ).toBe( 9 );
		expect( assessment.getText() ).toBe( "5% of the sentences contain <a href='https://yoa.st/passive-voice' target='_blank'>passive voice</a>, " +
			"which is less than or equal to the recommended maximum of 10%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "scores 2 passive sentences - 10%", function() {
		var assessment = passiveVoiceAssessment.getResult( paper, Factory.buildMockResearcher( {total: 20, passives: [ 1, 2 ] } ), i18n );
		expect( assessment.getScore() ).toBe( 9 );
		expect( assessment.getText() ).toBe( "10% of the sentences contain <a href='https://yoa.st/passive-voice' target='_blank'>passive voice</a>, " +
			"which is less than or equal to the recommended maximum of 10%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "scores 10 passive sentence - 50%", function() {
		var assessment = passiveVoiceAssessment.getResult( paper, Factory.buildMockResearcher( {total: 20, passives: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] } ), i18n );
		expect( assessment.getScore() ).toBe( 3 );
		expect( assessment.getText() ).toBe( "50% of the sentences contain <a href='https://yoa.st/passive-voice' target='_blank'>passive voice</a>, " +
			"which is more than the recommended maximum of 10%. Try to use their active counterparts." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "scores 5 passive sentences - 25%", function() {
		var assessment = passiveVoiceAssessment.getResult( paper, Factory.buildMockResearcher( {total: 20, passives: [ 1, 2, 3, 4, 5 ] } ), i18n );
		expect( assessment.getScore() ).toBe( 3 );
		expect( assessment.getText() ).toBe( "25% of the sentences contain <a href='https://yoa.st/passive-voice' target='_blank'>passive voice</a>, " +
			"which is more than the recommended maximum of 10%. Try to use their active counterparts." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "scores 5 passive sentences - 13.3%", function() {
		var assessment = passiveVoiceAssessment.getResult( paper, Factory.buildMockResearcher( {total: 30, passives: [ 1, 2, 3, 4 ] } ), i18n );
		expect( assessment.getScore() ).toBe( 6 );
		expect( assessment.getText() ).toBe( "13.3% of the sentences contain <a href='https://yoa.st/passive-voice' target='_blank'>passive voice</a>, " +
			"which is more than the recommended maximum of 10%. Try to use their active counterparts." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
});

describe( "A test for the applicableness of the passive voice assessment.", function() {
	it( "checks the applicableness of the passive voice assessment in the case of an unavailable locale", function() {
		var mockPaper = new Paper( "Hallo", { locale: "nl_NL" } );
		expect( passiveVoiceAssessment.isApplicable( mockPaper ) ).toBe( false );
	} );

	it( "checks the applicableness of the passive voice assessment in the case of an empty Paper", function() {
		var mockPaper = new Paper( "" );
		expect( passiveVoiceAssessment.isApplicable( mockPaper ) ).toBe( false );
	} );
});

describe( "A test for marking the sentences", function() {
	it ("returns markers", function() {
		var passiveVoice = Factory.buildMockResearcher( { passives: [ "He was robbed." ] } );
		var expected = [
			new Mark({ original: 'He was robbed.', marked: "<yoastmark class='yoast-text-mark'>He was robbed.</yoastmark>" }),
		];
		expect( passiveVoiceAssessment.getMarks( paper, passiveVoice ) ).toEqual( expected );
	} );

	it ("returns no markers", function() {
		var passiveVoice = Factory.buildMockResearcher( [ { passives: [ ] } ] );
		var expected = [];
		expect( passiveVoiceAssessment.getMarks( paper, passiveVoice ) ).toEqual( expected );
	} );
});
