var splitSentences = require( "../../../../js/researches/german/passivevoice-german/splitSentencesOld.js" );

describe("Test for matching German participles", function(){
	it("returns subsentences split on stopwords.", function(){
		var text = "A und B.";
		expect( splitSentences( text ) ).toEqual( [ 'A', 'B.' ]  );
	});

	it("returns subsentences split on stopwords.", function(){
		var text = "A und B und C und D und E.";
		expect( splitSentences( text ) ).toEqual( [ 'A', 'B', 'C', 'D', 'E.' ]  );
	});

	it("returns the entire sentence if no stopwords are matched.", function(){
		var text = "Beides klingt absurd - für deutsche Ohren.";
		expect( splitSentences( text ) ).toEqual( [ [ 'Beides klingt absurd - für deutsche Ohren.' ] ] );
	});



});
