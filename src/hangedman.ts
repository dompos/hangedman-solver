import { wordsList } from './dictionary';
//array of all the letter in the alphabet
const alphabet: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];
//length of the word to find
const wordLen: number = 7;
//list of the words with the correct length
const currentWordsList: string[] = [];
//list of all the occurrence per letter
const occurrenceCount: number[] = [];
//list in decremental order of the most present letter
const mostPresentLetter: string[] = [];
//populating the current word list
wordsList.forEach((word) => { if(word.length === wordLen) currentWordsList.push(word) })
for (let letter of alphabet){
    let count = 0;
    for(let word of currentWordsList){
        if(word.toLowerCase().includes(letter)) count++;
    }
    occurrenceCount.push(count);
}
for(let i = 0; i < occurrenceCount.length; i++){
    mostPresentLetter.push(alphabet[occurrenceCount.indexOf(Math.max(...occurrenceCount))]);
    occurrenceCount[occurrenceCount.indexOf(Math.max(...occurrenceCount))] = 0;
}
