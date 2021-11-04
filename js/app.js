import Wordy from "./wordy.js";


document.addEventListener("DOMContentLoaded",async function ready(){
	var dictionarySelectorEl = document.getElementById("dictionary-selector");
	var dictionaryEntriesLengthEl = document.getElementById("dictionary-entries-length");
	var loadTimingEl = document.getElementById("load-timing");
	var enterLettersEl = document.getElementById("enter-letters");
	var inputLettersEl = document.getElementById("input-letters");
	var unscrambleTimingEl = document.getElementById("unscramble-timing");
	var unscrambleBtn = document.getElementById("unscramble-btn");
	var wordListEl = document.getElementById("word-list");

	await loadWordList();

	// once word list is loaded, enable the UI
	unscrambleBtn.disabled = false;

	dictionarySelectorEl.addEventListener("change",loadWordList,false);
	enterLettersEl.addEventListener("keydown",onKeydown,false);
	unscrambleBtn.addEventListener("click",unscrambleLetters,false);


	// ********************************

	function onKeydown(evt) {
		if (evt.key == "Enter") {
			unscrambleLetters();
		}
	}

	function unscrambleLetters() {
		var letters = enterLettersEl.value.toUpperCase().trim();
		enterLettersEl.value = letters;

		// validate the input
		if (!/^[A-Z]{3,}$/.test(letters)) {
			alert("Enter at least 3 letters!");
			return;
		}

		var startTiming = performance.now();
		// find matching words
		var words = Wordy.findWords(letters);
		var endTiming = performance.now();
		printTiming(unscrambleTimingEl,Number(endTiming - startTiming) || 0);

		// any words found?
		if (words.length > 0) {
			enterLettersEl.value = "";
			inputLettersEl.innerHTML = `Input: <strong>${letters}</strong>`;
			wordListEl.innerHTML = words.join("<br>");
		}
		else {
			inputLettersEl.innerHTML = "";
			wordListEl.innerHTML = "<strong>--empty--</strong>";
		}
	}

	async function loadWordList() {
		var whichList = dictionarySelectorEl.value;
		if ([ "tiny", "short", "long", ].includes(whichList)) {
			let wordList = await (await fetch(`${whichList}-wordlist.json`)).json();

			let startTiming = performance.now();
			let length = Wordy.loadWords(wordList);
			let endTiming = performance.now();
			printTiming(loadTimingEl,Number(endTiming - startTiming) || 0);

			dictionaryEntriesLengthEl.innerText = `(entries: ${length})`;

			inputLettersEl.innerHTML = "";
			unscrambleTimingEl.innerHTML = "";
			wordListEl.innerHTML = "<strong>--empty--</strong>";
		}
	}

	function printTiming(timingEl,ms) {
		ms = Number(ms.toFixed(1));

		if (ms >= 50) {
			timingEl.innerHTML = `(<strong>${(ms / 1000).toFixed(2)}</strong> sec)`;
		}
		else {
			timingEl.innerHTML = `(<strong>${ms.toFixed(1)}</strong> ms)`
		}
	}

});
