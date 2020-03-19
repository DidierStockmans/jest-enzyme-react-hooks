const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word",
    guessInputPlaceholder: "Enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters"
  },
  emoji: {
    congrats: "🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "🤔",
    guessColumnHeader: "🤷‍",
    guessedWords: "🤷‍♀️",
    matchingLettersColumnHeader: "✅"
  }
};

function getStringByLanguage(
  languageCode,
  stringKey,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(
      `There's no string found for ${languageCode} with key ${stringKey}`
    );
    return strings["en"][stringKey];
  }

  return strings[languageCode][stringKey];
}

export default { getStringByLanguage };
