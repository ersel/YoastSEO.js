var passiveVoice = require( "../../../../js/researches/german/passivevoice-german/getPassiveVoiceGerman.js" );
var Paper = require( "../../../../js/values/Paper.js" );

describe( "detecting passive voice in sentences with irregularParticiples", function() {
	it( "does not return passive for an irregular directly followed by 'sein'", function () {
		paper = new Paper("Ich werde geschwommen sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "returns passive voice for an irregular not directly followed by 'sein'", function () {
		paper = new Paper("Es wird geschwommen worden sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does not return passive voice for an irregular directly followed by 'haben'", function () {
		paper = new Paper("Wir werden geschlossen haben.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "returns passive voice for an irregular not directly followed by 'haben'", function () {
		paper = new Paper("Es wird geschlossen worden sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "returns passive voice for an irregular without 'haben' or 'sein'", function () {
		paper = new Paper("Es wird geschlossen.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});
} );

describe( "detecting passive voice in sentences with regular participles", function() {
	it( "returns passive voice for a participle with 'ge' without 'haben' or 'sein'", function () {
		paper = new Paper("Es wird gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "returns passive voice for a participle with 'ge' directly followed by 'haben'", function () {
		paper = new Paper("Es wird gekauft haben.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});
} );

describe( "not detecting passive voice in active sentences", function() {
	it( "does not return passive for a sentence without a passive auxiliary", function () {
		paper = new Paper("Es ist geschlossen.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "filters out non-participles if they are followed by a punctuation mark", function () {
		paper = new Paper("Es wird geburtsakt.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});
} );

describe( "detecting passive voice in all passive verb tenses and moods", function() {
	it( "does return passive for Präsens Indikativ", function () {
		paper = new Paper("Es wird gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Präsens Konjunktiv I", function () {
		paper = new Paper("Es wird werde gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Präteritum Indikativ", function () {
		paper = new Paper("Es wurde gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Präteritum Konjunktiv II", function () {
		paper = new Paper("Es würde gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Perfekt Indikativ", function () {
		paper = new Paper("Es ist gekauft worden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Perfekt Konjunktiv I", function () {
		paper = new Paper("Es sei gekauft worden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Plusquamperfekt Indikativ", function () {
		paper = new Paper("Es war gekauft worden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Plusquamperfekt Konjunktiv II", function () {
		paper = new Paper("Es wäre gekauft worden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Indikativ", function () {
		paper = new Paper("Es wirst gekauft werden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Konjunktiv I", function () {
		paper = new Paper("Es werdest gekauft werden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Konjunktiv II", function () {
		paper = new Paper("Es würdest gekauft werden.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Indikativ", function () {
		paper = new Paper("Es wird gekauft worden sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Konjunktiv I", function () {
		paper = new Paper("Es werde gekauft worden sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Konjunktiv II", function () {
		paper = new Paper("Es würde gekauft worden sein.");
		expect( passiveVoice( paper ).passives.length ).toBe( 1 );
	});
} );

describe( "not detecting passive voice in all active verb tenses and moods", function() {
	it( "does not return passive for Präsens Indikativ", function () {
		paper = new Paper("Er kauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präsens Konjunktiv I", function () {
		paper = new Paper("Er kaufe.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präteritum Indikativ", function () {
		paper = new Paper("Er kaufte.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präteritum Konjunktiv II", function () {
		paper = new Paper("Er kaufte.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Perfekt Indikativ", function () {
		paper = new Paper("Er hat gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Perfekt Konjunktiv I", function () {
		paper = new Paper("Er habe gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Plusquamperfekt Indikativ", function () {
		paper = new Paper("Er hatte gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Plusquamperfekt Konjunktiv II", function () {
		paper = new Paper("Er hätte gekauft.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Indikativ", function () {
		paper = new Paper("Er wird kaufen.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Konjunktiv I", function () {
		paper = new Paper("Er werde kaufen.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Konjunktiv II", function () {
		paper = new Paper("Er würde kaufen.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Indikativ", function () {
		paper = new Paper("Er wird gekauft haben.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Konjunktiv I", function () {
		paper = new Paper("Er werde gekauft haben.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Konjunktiv II", function () {
		paper = new Paper("Er würde gekauft haben.");
		expect( passiveVoice( paper ).passives.length ).toBe( 0 );
	});
} );
