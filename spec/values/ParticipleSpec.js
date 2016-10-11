var Participle = require( "../../js/values/Participle.js" );

describe( "A test for checking the german Participle", function() {
	it( "checks the properties of the german participle object without a passive", function() {
		var mockParticiple = new Participle( "geschlossen", "Es wird geschlossen worden sein.",  "werden",  "irregular" );
		expect( mockParticiple.getParticiple() ).toBe( "geschlossen" );
		expect( mockParticiple.getSentencePart() ).toBe( "Es wird geschlossen worden sein." );
		expect( mockParticiple.getType() ).toBe( "irregular" );
		expect( mockParticiple.getAuxiliary() ).toBe( "werden" );
		expect( mockParticiple.determinesSentencePartIsPassive() ).toBe( true );
	});

	it( "checks the properties of the german participle object without a passive", function() {
		var mockParticiple = new Participle( "geschlossen", "Wir werden geschlossen haben.",  "werden",  "irregular" );
		mockParticiple.setSentencePartPassiveness( false );
		expect( mockParticiple.getParticiple() ).toBe( "geschlossen" );
		expect( mockParticiple.getSentencePart() ).toBe( "Wir werden geschlossen haben." );
		expect( mockParticiple.getType() ).toBe( "irregular" );
		expect( mockParticiple.getAuxiliary() ).toBe( "werden" );
		expect( mockParticiple.determinesSentencePartIsPassive() ).toBe( false );
	});

});

