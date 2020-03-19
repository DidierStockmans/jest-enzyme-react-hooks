import React from "react";
import { mount } from "enzyme";

import successContext from "./context/successContext";
import guessedWordsContext from "./context/guessedWordsContext";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
import { findByTestAttr } from "../test/testUtils";

const setup = (guessedWordsStrings = [], secretWord = "party") => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitBtn = findByTestAttr(wrapper, "submit-button");

  // populating the guessedWords
  guessedWordsStrings.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitBtn.simulate("click");
  });

  return [wrapper, inputBox, submitBtn];
};

describe(`simulate guessing tests`, () => {
  let wrapper;
  let inputBox;
  let submitBtn;
  describe("non-empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitBtn] = setup(["agile"], "party");
    });

    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitBtn.simulate("click");
      });

      test("The input should not be visible when guess is correct", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
      test("GuessedWords table is showing correct row count", () => {
        const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordRows.length).toBe(2);
      });
    });

    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "agile" } };
        inputBox.simulate("change", mockEvent);
        submitBtn.simulate("click");
      });

      test("The input should be visible when guess is incorrect", () => {
        expect(inputBox.exists()).toBe(true);
      });
      test("GuessedWords table is showing correct row count", () => {
        const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordRows.length).toBe(2);
      });
    });
  });
  describe("empty guessedWord", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitBtn] = setup([], "party");
    });
    test("GuessedWords table is showing correct row count", () => {
      const mockEvent = { target: { value: "train" } };
      inputBox.simulate("change", mockEvent);
      submitBtn.simulate("click");
      const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordRows.length).toBe(1);
    });
  });
});
