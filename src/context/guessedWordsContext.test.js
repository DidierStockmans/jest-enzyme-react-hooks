import React from "react";
import guessedWordsContext from "./guessedWordsContext";
import { shallow, mount } from "enzyme";

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

// test("should throw an Error when `useGuessedWords` is used outside an GuessedWordsProvider", () => {
//   expect(() => {
//     shallow(<FunctionalComponent />);
//   }).toThrow(
//     "The useGuessedWords hook should be used within a GuessedWordsProvider"
//   );
// });

test("should not throw an Error when `useGuessedWords` is used within GuessedWordsProvider", () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow(
    "The useGuessedWords hook should be used within a GuessedWordsProvider"
  );
});
