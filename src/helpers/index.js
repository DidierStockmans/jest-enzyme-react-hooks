/**
 * A function to check how many letters from the guessed word are used in the secret word
 * @function
 * @param {string} guessedWord - Guessed word
 * @param {string} secretWord - Secret word that should be guessed
 * @returns {number}
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetters = new Set(secretWord.split(""));
  const guessedLetters = new Set(guessedWord.split(""));
  return [...secretLetters].filter(letter => guessedLetters.has(letter)).length;
}
