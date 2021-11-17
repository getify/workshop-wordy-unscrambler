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
pool.grow(23);

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

function findWords(input,prefix = "",node = dict) {
	try {
		var allWords = findAllWords(input,prefix,node);
		// return a copy of the words list, so we can
		// keep the current array in the pool and not leak
		// instances
		return [ ...allWords ];
	}
	finally {
		allWords.length = 0;
		pool.recycle(allWords);
	}
}

function findAllWords(input,prefix = "",node = dict) {
	var words = pool.use();

	// is the current node the end of a valid word?
	if (node[isWord]) {
		words.push(prefix);
	}

	for (let i = 0; i < input.length; i++) {
		let currentLetter = input[i];

		// does the current (sub)trie have a node for this letter?
		if (node[currentLetter]) {
			let remainingLetters = pool.use();
			remainingLetters.push(
				...input.slice(0,i),
				...input.slice(i + 1)
			);
			let moreWords = findAllWords(
				remainingLetters,
				prefix + currentLetter,
				node[currentLetter]
			);
			words.push(...moreWords);

			// reset the temporary arrays and recycle
			// them back to the pool
			remainingLetters.length = moreWords.length = 0;
			pool.recycle(remainingLetters);
			pool.recycle(moreWords);
		}
	}

	// construct a de-duplicated set of words
	var wordsSet = new Set(words);

	// empty the previous words list
	words.length = 0;

	// re-insert the de-duplicated words from the set
	words.push(...wordsSet);
	return words;
}
