import readlineSync from 'readline-sync';
import { wordsList } from './dictionary_small';
//array of all the letter in the alphabet
const alphabet: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
];

//length of the word to find
let wordLen: number = Number(readlineSync.question('Numero lettere: '));
//letters present in the words
let wordToFindTemplate: string = '';
let wtfArr: string[] = [...wordToFindTemplate];
//letters not present in the word 
let outArr: string[] = [];
//number of the letter in wordToFindTemplate 
let numOfLetter: number = 0;
//populating numOfLetter
wtfArr.forEach((letter) => {
    if (letter !== '_') numOfLetter++;
})
//list of the words with the correct length
let currentWordsList: string[] = [];
//list of the words that match the word to find
let currentWordToFindList: string[] = [];
//list of all the occurrence per letter
const occurrenceCount: number[] = [];
//list in decremental order of the most present letter
const mostPresentLetter: string[] = [];
//populating the current word list
wordsList.forEach((word) => { if (word.length === wordLen) currentWordsList.push(word) })
//populating occurrence count
for (let letter of alphabet) {
    let count = 0;
    for (let word of currentWordsList) {
        if (word.toLowerCase().includes(letter)) count++;
    }
    occurrenceCount.push(count);
}
//populating most present letter
for (let i = 0; i < occurrenceCount.length; i++) {
    mostPresentLetter.push(alphabet[occurrenceCount.indexOf(Math.max(...occurrenceCount))]);
    occurrenceCount[occurrenceCount.indexOf(Math.max(...occurrenceCount))] = 0;
}
const WordsList: (wtfArr: string[], outArr: string[], numOfLetter: number) => void = (wtfArr, outArr, numOfLetter) => {
    currentWordsList.forEach((word) => {
        let skip: boolean = false;
        if (outArr.length > 0) {
            outArr.forEach((letter) => {
                if (word.includes(letter)) skip = true;
            })
        }
        if (skip) return;
        let count: number = 0;
        for (let index in wtfArr) {
            if (wtfArr[index] !== '_' && word.charAt(Number(index)) === wtfArr[index]) count++;
        }
        if (count === numOfLetter) currentWordToFindList.push(word);
    })
    console.log(mostPresentLetter);
    console.log(currentWordToFindList);
    currentWordToFindList = [];
}
const setNew: () => void = () => {
    wordLen = Number(readlineSync.question('Numero lettere: '));
    currentWordsList = [];
    wordsList.forEach((word) => { if (word.length === wordLen) currentWordsList.push(word) })
    for (let i = 0; i < wordLen; i++) {
        wordToFindTemplate += '_';
    }
    wtfArr = [...wordToFindTemplate];
    outArr = [];
    numOfLetter = 0;
    console.log(currentWordToFindList);
    console.log('-----------------');
}
let option: string = 'new';
while (option !== 'stop') {
    switch (option) {
        case 'new':
            setNew();
            WordsList(wtfArr, outArr, numOfLetter);
            option = 'cont'
            break;
        case 'cont':
            numOfLetter = 0;
            let template: string | string[] = readlineSync.question('Template parola: ');
            if(template === 'new'){
                option = 'new';
                break;
            }
            template = [...template];
            for (let i = 0; i < template.length; i += 2) {
                wtfArr[Number(template[i]) - 1] = template[i + 1];
            }
            //populating numOfLetter
            wtfArr.forEach((letter) => {
                if (letter !== '_') numOfLetter++;
            })
            if(template.length === 0){
                let tempOut: string = readlineSync.question('Lettera non presente nella parola: ');
                if(tempOut !== '') outArr.push(tempOut);
            }
            WordsList(wtfArr, outArr,numOfLetter);
            break;
        default:
            break;
    }
}