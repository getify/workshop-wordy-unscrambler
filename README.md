# Wordy Unscrambler

This workshop project explores the algorithmic complexities (speed and memory) of processing a set of input letters (like "EHLOL"), unscrambling them to match words from an English words dictionary (like "HELL" and "HELLO").

There are many similar unscramblers available on the web, which help you play (or cheat at!) games like **Wordscapes** ([Google Play](https://play.google.com/store/apps/details?id=com.peoplefun.wordcross&hl=en_US&gl=US), [Apple App Store](https://apps.apple.com/us/app/wordscapes/id1207472156)). Our intent here is to explore algorithms and implementation choices, not just playing games!

Three dictionaries are provided in this app:

* `tiny-wordlist.json` has about 80 words

* `short-wordlist.json` (selected by default) has about 2,400 words

* `long-wordlist.json` has about 370,000 words

Wordy Unscrambler allows you to select the dictionary to use from the drop-down. This allows you to compare the performance of the algorithms as the length of the list grows by multiple orders of magnitude. The app will also report how many entries (in memory) each dictionary uses -- which depends on the type of data structure used, not just the number of words loaded.

**NOTE:** Algorithmic complexity (aka, "Big-O") performance is not just about speed, but also about memory usage. There are often tradeoffs between speed and memory, where you can use more memory to decrease time spent on operations, and vice versa.

## Workshop Instructions

1. Check out the `start-here` branch.

2. Consult the `app.js` module for the app logic already implemented:

	* Loads the dictionary .json file (3 choices available in drop-down), constructs the dictionary data structure, and reports the return value as the number of entries in the data structure.

	* Takes input letters (at least 3) to unscramble and find matches, displaying the returned list of words (if any).

	* Reports the time to initialize the dictionary data structure, and the time to find matched words, in the app's UI.

3. Now consult the `wordy.js` module for the algorithm logic to be implemented (look for the `TODO` comments):

	* The `loadWords(..)` function accepts an array of words and returns how many entries were inserted into the dictionary data structure.

	* The `findWords(..)` function accepts a string of uppercase letters (at least 3) and returns any words from the dictionary that can be spelled with some or all of those letters.

4. Verify your logic using the "tiny" dictionary, which is short enough to visually inspect and construct what words should match your input.

	As an example search (on the "tiny" dictionary), the letters "LOYSURFE" ("YOURSELF" scrambled up) should return the following words:

		- "FOR"
		- "OUR"
		- "USE"
		- "YOU"
		- "YOUR"
		- "YOURSELF"

5. Compare how your verified algorithms perform (speed and memory) as you select the "tiny", "short", and "long" dictionary. Also, compare how longer sets of letters impact your performance, such as with 6 characters, 8 characters, 10 characters, etc.

	**Hints:** "AMERICAN" is a good 8 character word and "MEANINGFUL" is a good 10 character word, both of which return quite a few words even with just the "short" dictionary selected.

6. When you're ready, or if you get stuck in your own implementation, check out the `option-1`, `option-2`, and `option-3` branches and compare your solution to the ones provided:

	* `option-1` uses the most naive approaches: it stores the dictionary in an array, and does a recursive permutation of the input letters to compare to each entry.

	* `option-2` loads the dictionary into a basic [**trie** data structure](https://en.wikipedia.org/wiki/Trie), and does a recursive permutation of the input letters to traverse the trie. Because this sort of traversal can result in duplicate words, we de-duplicate the list before returning it.

	* `option-3` loads the dictionary into an optimized [**minimal-word-graph** data structure](https://github.com/gotenxds/WordGraphs#minimalwordgraph-aka-dagw), aka [**DAWG** data structure](https://en.wikipedia.org/wiki/Directed_acyclic_word_graph), aka [**DAFSA** data structure](https://en.wikipedia.org/wiki/Deterministic_acyclic_finite_state_automaton).

		Unfortunately, the search option on this data structure returns words we don't want for our usage: it includes words which reuse letters that aren't duplicated in the original input, and it can also return duplicate words in some cases. As such, we have to filter the return to remove these unwanted words.

## Extra Credit

Develop a test plan and suite of tests to verify the `Wordy` module's functionality.

## Running the App

The app should be run in a local web server and accessed in a browser such as at `http://localhost:8080` (or whatever port you prefer).

If you have any recent node/npm installed on your system, you can switch into the workshop project directory, and run a command like this:

```cmd
npx http-server ./ -p 8080
```

That should start up a simple static file server in that current working directory and bind it to localhost on the port number as specified.

## Workshop Resources

This repository is part of my "Thinking & Coding Algorithms" workshop, which has been presented at a number of public JS/web conferences, as well as for private corporate training engagements. In addition, it is included in my [Frontend Masters course on algorithms and data structures](https://frontendmasters.com/courses/algorithms-practice/).

Please note that as this material evolves/improves over time, there may be changes to the branch names (e.g., "Option-1", "Option-2b", etc) to make room for these changes while preserving (as much as possible) the repository state as presented in various different workshops. When that current state appears to have diverged, please consult the git commit history to access older versions of files/resources.

## License

All code and documentation are (c) 2021 Kyle Simpson and released under the [MIT License](http://getify.mit-license.org/). A copy of the MIT License [is also included](LICENSE.txt).
