# Hanged Man Game

A simple **Hanged Man** game built with **TypeScript** and `readline-sync`. The goal is to guess a word based on its length and the known letters, while also eliminating incorrect guesses. The game uses a dictionary of words (`dictionary_small`) to suggest possible words and letters based on user input.

## Features

- **Interactive guessing**: The user provides letter guesses, and the game updates the word template accordingly.
- **Most frequent letters**: The game suggests the most frequent letters in the remaining possible words.
- **Letter exclusion**: The user can eliminate letters that are not part of the word.
- **Dynamic word list**: The game narrows down the list of possible words as the user progresses.

## Requirements

- Node.js (v12.0 or higher)
- TypeScript (v4.0 or higher)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/dompos/hangedman-solver.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hangedman-solver
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Install TypeScript globally (if you haven't already):

    ```bash
    npm install -g typescript
    ```

5. Compile the TypeScript files:

    ```bash
    tsc
    ```

## Usage

1. Start the game by running the compiled JavaScript file:

    ```bash
    node dist/index.js
    ```

2. The game will prompt you to input the following:
   - **Number of letters**: The length of the word you are trying to guess.
   - **Word template**: The user will enter known letters in the word template using the following format:
     - For a known letter, input the **position** of the letter followed by the letter itself, e.g., `2a` means the second letter of the word is `a`.
     - Multiple letters can be entered by providing them in sequence, e.g., `2a7b` means the second letter is `a` and the seventh letter is `b`.
   - **Letters not in the word**: The user can also provide letters that are known not to be in the word, and the game will exclude them from the possible words.

3. **Game flow**:
   - You can continue making guesses or start a new round by typing `new`.
   - If you want to stop the game, type `stop`.

### Example Interaction

```bash
Number of letters: 5
Word template: 2a7b
Letter not present in the word: x
Most frequent letters: ['e', 'a', 'r', 's', 't']
Words matching: ['apple', 'grape', 'stone', ...]
