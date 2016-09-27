var splitSentences = require( "../../../../js/researches/german/passivevoice-german/splitSentences.js" );

describe("Test for matching German participles", function(){
	it("returns subsentences split on stopwords.", function(){
		var text = "A und B. B oder C.";
		expect( splitSentences( text ) ).toEqual( [ [ 'A', 'und B.' ], [ 'B', 'oder C.' ]  ] );
	});
	it("returns subsentences split on stopwords.", function(){
		var text = "Deshalb scharen sie sich um die Führung, am Sonntag haben sie die Partei Einiges Russland mit einer " +
			"75-Prozent-Mehrheit im Parlament ausgestattet, trotz Wirtschaftskrise und Korruptionsskandalen. Wer interessiert sich " +
			"schon für kaputte Straßen und sinkende Löhne, wenn der Feind vor den Toren steht?";
		expect( splitSentences( text ) ).toEqual( [ [ 'Deshalb scharen sie sich um die Führung, am Sonntag haben sie die ' +
			'Partei Einiges Russland mit einer 75-Prozent-Mehrheit im Parlament ausgestattet,', 'trotz Wirtschaftskrise',
			'und Korruptionsskandalen.' ], [ 'Wer interessiert sich schon für kaputte Straßen', 'und sinkende Löhne,',
			'wenn der Feind vor den Toren steht?' ] ] );
	});
	it("returns the entire sentence if no stopwords are matched.", function(){
		var text = "Beides klingt absurd - für deutsche Ohren.";
		expect( splitSentences( text ) ).toEqual( [ ['Beides klingt absurd - für deutsche Ohren.' ] ] );
	});

	it("splits on a colon.", function(){
		var text = "Es klingt absurd: fliegende Sandwiches.";
		expect( splitSentences( text ) ).toEqual( [ [ 'Es klingt absurd', ': fliegende Sandwiches.' ] ] );
	});

	it("splits twice in case of two consecutive stopwords.", function(){
		var text = "Wer aber in Moskau oder anderswo in Russland vor dem Fernseher sitzt, dem ist das Bild vertraut.";
		expect( splitSentences( text ) ).toEqual( [ [ 'Wer', 'aber in Moskau', 'oder anderswo in Russland vor dem Fernseher sitzt, dem ist das Bild vertraut.' ] ] );
	});

	it("does not return an empty sentence as the first sentence when a sentence starts with a stopword.", function(){
		var text = "Wer in Moskau oder anderswo in Russland vor dem Fernseher sitzt, dem ist das Bild vertraut.";
		expect( splitSentences( text ) ).toEqual( [ [ 'Wer in Moskau', 'oder anderswo in Russland vor dem Fernseher sitzt, dem ist das Bild vertraut.' ] ] );
	});
});
