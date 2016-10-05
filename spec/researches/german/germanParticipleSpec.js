var GermanParticiple = require( "../../../js/researches/german/GermanParticiple.js" );

describe( "A test for checking the german Participle", function() {
	it( "checks the properties of the german participle object without a passive", function() {
		var mockParticiple = new GermanParticiple( "geschlossen", "Wir werden geschlossen haben",  "werden",  "irregular" );
		expect( mockParticiple.getParticiple() ).toBe( "geschlossen" );
		expect( mockParticiple.hasHabenSeinException() ).toBe( true );
		expect( mockParticiple.isPassive() ).toBe( false );
	});

	it( "checks the properties of the german participle object without a passive", function() {
		var mockParticiple = new GermanParticiple( "geschlossen", "Es wird geschlossen worden sein.",  "werden",  "irregular" );
		expect( mockParticiple.getParticiple() ).toBe( "geschlossen" );
		expect( mockParticiple.hasHabenSeinException() ).toBe( false );
		expect( mockParticiple.isPassive() ).toBe( true );
	});
});
