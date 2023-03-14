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

			// did any permutations of the input match?
			checkWord(word,input)
		) {
			words.push(word);
		}
	}

	return words;
}

function checkWord(word,input) {
	return permute("",input);

	// *************************

	// permute the input letters (k! variations)
	function permute(prefix,remaining) {
		for (let i = 0; i < remaining.length; i++) {
			let current = prefix + remaining[i];

			// found a permutation that matched?
			if (current == word) {
				return true;
			}
			else if (
				// any remaining input letters to permute and concat?
				remaining.length > 1 &&

				// current string shorter than the target word?
				current.length < word.length &&

				// current string at start of the target word?
				word.startsWith(current)
			) {
				// check all the permuted remaining letters
				if (
					permute(current,remaining.slice(0,i) + remaining.slice(i + 1))
				) {
					// propagate the match-found signal back up the
					// recursion chain
					return true;
				}
			}
		}

		return false;
	}
}
