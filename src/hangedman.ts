import { wordsList } from './dictionary_medium';
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
//letter present in the words
const wordToFindTemplate: string = '_o_d__e';
const wtfArr: string[] = [...wordToFindTemplate];
//number of the letter in wordToFindTemplate 
let numOfLetter: number = 0;
//populating numOfLetter
wtfArr.forEach((letter) => {
    if(letter !== '_') numOfLetter++;
})
//list of the words with the correct length
const currentWordsList: string[] = [];
//list of the words that match the word to find
const currentWordToFindList: string[] = [];
//list of all the occurrence per letter
const occurrenceCount: number[] = [];
//list in decremental order of the most present letter
const mostPresentLetter: string[] = [];
//populating the current word list
wordsList.forEach((word) => { if(word.length === wordLen) currentWordsList.push(word) })
//populating occurrence count
for (let letter of alphabet){
    let count = 0;
    for(let word of currentWordsList){
        if(word.toLowerCase().includes(letter)) count++;
    }
    occurrenceCount.push(count);
}
//populating most present letter
for(let i = 0; i < occurrenceCount.length; i++){
    mostPresentLetter.push(alphabet[occurrenceCount.indexOf(Math.max(...occurrenceCount))]);
    occurrenceCount[occurrenceCount.indexOf(Math.max(...occurrenceCount))] = 0;
}
currentWordsList.forEach((word) => {
    let count: number = 0;
    for(let index in wtfArr){
        if(wtfArr[index] !== '_' && word.charAt(Number(index)) === wtfArr[index]) count++;
    }
    if(count === numOfLetter) currentWordToFindList.push(word);
})
console.log(mostPresentLetter);
console.log(currentWordToFindList);