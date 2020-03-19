import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import guessedWordsContext from "./context/guessedWordsContext";
import { findByTestAttr } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

/**
 * Set up function that returns a shallow wrapper from enzyme with props
 * @function
 * @param {array} guessedWords - React props
 * @returns {ShallowWrapper} - ShallowWrapper from enzyme
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("testing guessed words", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 }
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test("renders without errors", () => {
    const component = findByTestAttr(wrapper, "guessed-words-component");
    expect(component.length).toBe(1);
  });
  test("renders `guessed words` section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});

describe("test language context", () => {
  let originalUseContext;
  beforeEach(() => {
    originalUseContext = React.useContext;
  });
  afterEach(function() {
    React.useContext = originalUseContext;
  });
  test("should render the english instruction when `guessedWords` is empty", () => {
    React.useContext = jest.fn().mockReturnValue("en");
    const wrapper = setup([]);
    const instruction = findByTestAttr(wrapper, "instruction-message");
    expect(instruction.text()).toBe("Try to guess the secret word");
  });
  test("should render the emoji instruction when `guessedWords` is empty", () => {
    React.useContext = jest.fn().mockReturnValue("emoji");
    const wrapper = setup([]);
    const instruction = findByTestAttr(wrapper, "instruction-message");
    expect(instruction.text()).toBe("🤔🤫🔤");
  });
});
