export default {
	loadWords,
	findWords
};


// ****************************

var dict = [];

function loadWords(wordList) {
	// here our dictionary is just a (sorted) array of strings,
	// nothing more fancy than that
	dict = [ ...wordList ];

	return dict.length;
}

function findWords(input) {
	var words = [];

	// consult every word in our dictionary
	for (let word of dict) {
		if (
			// enough input characters to construct the word?
			input.length >= word.length &&

			// can we spell this word with the given letters?
			checkWord(word,input)
		) {
			words.push(word);
		}
	}

	return words;
}

function checkWord(word,input) {
	for (let i = 0; i < word.length; i++) {
		let idx = input.indexOf(word[i]);
		if (idx == -1) return false;
		input = input.slice(0,idx) + input.slice(idx+1);
	}

	return true;
}
