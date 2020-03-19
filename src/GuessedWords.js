import React from "react";
import PropTypes from "prop-types";

import languageContext from "./context/languageContext";
import guessedWordsContext from "./context/guessedWordsContext";
import StringModule from "./helpers/strings";

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);

  return (
    <div data-test="guessed-words-component">
      {guessedWords.length === 0 && (
        <span data-test="instruction-message">
          {StringModule.getStringByLanguage(language, "guessPrompt")}
        </span>
      )}
      {guessedWords.length > 0 && (
        <div data-test="guessed-words">
          <h3>{StringModule.getStringByLanguage(language, "guessedWords")}</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>
                  {StringModule.getStringByLanguage(
                    language,
                    "guessColumnHeader"
                  )}
                </th>
                <th>
                  {StringModule.getStringByLanguage(
                    language,
                    "matchingLettersColumnHeader"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map(({ guessedWord, letterMatchCount }, index) => (
                <tr data-test="guessed-word" key={index}>
                  <td>{guessedWord}</td>
                  <td>{letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuessedWords;
