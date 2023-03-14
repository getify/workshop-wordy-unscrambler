export default {
	loadWords,
	findWords
};


// ****************************

var dict = {};
var isWord = Symbol("is-word");

function loadWords(wordList) {
	var nodeCount = 0;

	// reset a previously loaded dictionary?
	if (Object.keys(dict).length > 0) {
		dict = {};
	}

	// construct the dictionary as a trie
	for (let word of wordList) {
		// traverse down the trie (from the root), creating nodes
		// as necessary
		let node = dict;
		for (let letter of word) {
			if (!node[letter]) {
				node[letter] = {
					[isWord]: false,
				};
				nodeCount++;
			}
			node = node[letter];
		}

		// mark the terminal node for this word
		node[isWord] = true;
	}

	return nodeCount;
}

function findWords(input,prefix = "",node = dict,words = new Set()) {
	// is the current node the end of a valid word?
	if (node[isWord]) {
		words.add(prefix);
	}

	for (let i = 0; i < input.length; i++) {
		let currentLetter = input[i];

		// does the current (sub)trie have a node for this letter?
		if (node[currentLetter]) {
			let remainingLetters = [
				...input.slice(0,i),
				...input.slice(i + 1)
			];
			findWords(
				remainingLetters,
				prefix + currentLetter,
				node[currentLetter],
				words
			);
		}
	}

	if (node == dict) {
		words = Array.from(words);
	}
	return words;
}
