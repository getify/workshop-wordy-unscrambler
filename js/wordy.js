import deePool from "./external/deePool.mjs";


export default {
	loadWords,
	findWords
};


// ****************************

var pool = deePool.create(() => []);
var dict = {};
var isWord = Symbol("is-word");

// initialize the object pool for the expected
// maximum number of arrays needed
pool.grow(40);

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
			// check out an array from the pool
			let remainingLetters = pool.use();

			// use the checked-out array
			remainingLetters.push(
				...input.slice(0,i),
				...input.slice(i + 1)
			);
			findWords(
				remainingLetters,
				prefix + currentLetter,
				node[currentLetter],
				words
			);

			// reset checked-out array
			remainingLetters.length = 0;

			// recycle checked-out array
			pool.recycle(remainingLetters);
		}
	}

	if (node == dict) {
		words = Array.from(words);
	}
	return words;
}
