// Import the readlineSync module to handle user input
import readlineSync from 'readline-sync';
// Import the list of words from an external dictionary file
import { wordsList } from './dictionary_large';

// Array containing all letters of the alphabet
const alphabet: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
];

// Initial Variables
// Length of the word to guess
// let wordLen: number = Number(readlineSync.question('Number of letters: '));
let wordLen: number = 0;
// Template for the word to find, initially empty
let wordToFindTemplate: string = '';
// Array representing the word to find, based on the template (with unguessed letters as '_')
let wtfArr: string[] = [...wordToFindTemplate];
// Array of letters that are not present in the word
let outArr: string[] = [];
// Number of correctly guessed letters (excluding '_')
let numOfLetter: number = 0;

// Populate numOfLetter by counting the letters already guessed in the template
wtfArr.forEach((letter) => {
    if (letter !== '_') numOfLetter++;
});

// List of words with the correct length
let currentWordsList: string[] = [];
// List of words matching the template of the word to find
let currentWordToFindList: string[] = [];
// Array to store the occurrence count of each letter
let occurrenceCount: number[] = [];
// Array of the letters sorted by their frequency in descending order
let mostPresentLetter: string[] = [];

// // Populate currentWordsList with words that have the correct length
// wordsList.forEach((word) => { 
//     if (word.length === wordLen) currentWordsList.push(word);
// });

/**
 * Function that filters words based on the template of the word to find
 * and the letters that are not present in the word.
 * 
 * @param {string[]} wtfArr - Array representing the word to find, with guessed letters and '_'.
 * @param {string[]} outArr - Array containing the letters not present in the word.
 * @param {number} numOfLetter - The number of correctly guessed letters in the template.
 */
const WordsList: (wtfArr: string[], outArr: string[], numOfLetter: number) => void = (wtfArr, outArr, numOfLetter) => {
    currentWordsList.forEach((word) => {
        let skip: boolean = false;

        // If there are letters that should not be in the word, skip words containing those letters
        if (outArr.length > 0) {
            outArr.forEach((letter) => {
                if (word.toLowerCase().includes(letter)) skip = true;
            });
        }
        if (skip) return;

        // Count how many letters in the word match the template of the word to find
        let count: number = 0;
        wtfArr.forEach((letter, index) => {
            if (letter === '_' && wtfArr.includes(word.charAt(index))) count = 0;
            if (letter !== '_' && word.charAt(index) === letter) count++;
        });

        // If the word matches the number of correctly guessed letters, add it to the list of possible words
        if (count === numOfLetter) currentWordToFindList.push(word);
    });
    // Display the list of most frequent letters
    console.log(mostPresentLetter);
    // Display the list of words that could match the template
    console.log(currentWordToFindList);

    // Reset the list of found words for the next iteration
    currentWordToFindList = [];
}

/**
 * Function to set up a new round of the game.
 * Resets variables and generates a new list of words based on the selected word length.
 */
const setNew: () => void = () => {
    wordLen = Number(readlineSync.question('Number of letters: '));
    currentWordsList = [];
    occurrenceCount = [];
    mostPresentLetter = [];

    // Populate currentWordsList with words that have the correct length
    wordsList.forEach((word) => { if (word.length === wordLen) currentWordsList.push(word) });

    // Create the template for the word to find (composed of '_')
    for (let i = 0; i < wordLen; i++) {
        wordToFindTemplate += '_';
    }
    wtfArr = [...wordToFindTemplate];
    outArr = [];
    numOfLetter = 0;
    // Populate occurrenceCount with how many times each letter appears in the words of currentWordsList
    for (let letter of alphabet) {
        let count = 0;
        for (let word of currentWordsList) {
            if (word.toLowerCase().includes(letter)) count++;
        }
        occurrenceCount.push(count);
    }

    // Populate mostPresentLetter by sorting the letters based on their frequency, from most to least frequent
    for (let i = 0; i < occurrenceCount.length; i++) {
        mostPresentLetter.push(alphabet[occurrenceCount.indexOf(Math.max(...occurrenceCount))]);
        occurrenceCount[occurrenceCount.indexOf(Math.max(...occurrenceCount))] = 0;
    }
}

// Initial option to start the game
let option: string = 'new';

// Main game loop
while (option !== 'stop') {
    switch (option) {
        case 'new':
            // Start a new round: reset the state and begin a new game
            setNew();
            WordsList(wtfArr, outArr, numOfLetter);
            option = 'cont'; // Continue the game
            break;

        case 'cont':
            numOfLetter = 0;
            let template: string | string[] = readlineSync.question('Word template: ');

            if (template === 'new') {
                // If the user wants to start a new round
                option = 'new';
                break;
            }
            if (template === 'stop') {
                // If the user wants to start a new round
                option = 'stop';
                console.clear();
                console.log('Game ended!');
                break;
            }

            // Convert the template string into an array to update the word template
            template = [...template];

            // Update the wtfArr template with the newly guessed letters
            for (let i = 0; i < template.length; i += 2) {
                if (alphabet.includes(template[i + 1])) {
                    wtfArr[Number(template[i]) - 1] = template[i + 1];
                } else {
                    const num: string = template[i] + template[i + 1];
                    wtfArr[Number(num) - 1] = template[i + 2];
                    i++;
                }
            }
            // Populate numOfLetter with the number of correctly guessed letters in the template
            wtfArr.forEach((letter) => {
                if (letter !== '_') numOfLetter++;
            });

            // If the user hasn't guessed a letter, ask for a letter not in the word
            if (template.length === 0) {
                let tempOut: string = readlineSync.question('Letter not present in the word: ');
                if (tempOut !== '') outArr.push(tempOut);
            }

            // Filter the word list based on the updated template
            WordsList(wtfArr, outArr, numOfLetter);
            break;

        default:
            break;
    }
}
