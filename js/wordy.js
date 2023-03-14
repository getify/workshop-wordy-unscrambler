export default {
	loadWords,
	findWords
};


// ****************************

// DAWG (directed acyclic word graph)
var dict = new MinimalWordGraph();

function loadWords(wordList) {
	if (dict.size() > 0) {
		dict = new MinimalWordGraph();
	}

	for (let word of wordList) {
		dict.add(word);
	}

	// performance optimization
	dict.makeImmutable();

	return dict.size();
}

function countLetters(str) {
	var counts = {};
	for (let letter of str) {
		counts[letter] = (counts[letter] || 0) + 1;
	}
	return counts;
}

function findWords(input) {
	// collect counts of input letters
	var inputCounts = countLetters(input);

	// de-duplicate the input characters
	input = [ ...(new Set(input)) ];

	// search the minimum-word-graph for words matching the
	// input letters
	var words = dict.containsOnly(
		Array.isArray(input) ? input :
		typeof input == "string" ? input.split("") :
		[]
	);

	// filter out words whose letter counts exceed the input letter counts
	return words.filter(function removeWords(word){
		var wordLetterCounts = countLetters(word);
		for (let [ letter, count ] of Object.entries(wordLetterCounts)) {
			if (!inputCounts[letter] || count > inputCounts[letter]) {
				return false;
			}
		}
		return true;
	});
}
