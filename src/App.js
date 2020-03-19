import React from "react";

import hookActions from "./actions/hookActions";
import Input from "./Input";
import LanguagePicker from "./LanguagePicker";
import languageContext from "./context/languageContext";
import successContext from "./context/successContext";
import guessedWordsContext from "./context/guessedWordsContext";

import "./styles.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action.type ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: "",
    language: "en"
  });

  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  const setLanguage = lang => dispatch({ type: "setLanguage", payload: lang });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Input secretWord={state.secretWord} />
            <Congrats />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
};

export default App;
