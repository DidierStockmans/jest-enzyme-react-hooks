import React from "react";
import PropTypes from "prop-types";

import StringModule from "./helpers/strings";
import languageContext from "./context/languageContext";
import successContext from "./context/successContext";
import guessedWordsContext from "./context/guessedWordsContext";
import { getLetterMatchCount } from "./helpers";

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const language = React.useContext(languageContext);

  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  const submitForm = e => {
    e.preventDefault();

    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);

    setGuessedWords([
      ...guessedWords,
      { guessedWord: currentGuess, letterMatchCount }
    ]);

    if (currentGuess === secretWord) {
      setSuccess(true);
    }

    setCurrentGuess("");
  };

  if (success) {
    return null;
  }

  return (
    <div data-test="component-input">
      <form className="form form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
          type="text"
          placeholder={StringModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={e => submitForm(e)}
        >
          {StringModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
