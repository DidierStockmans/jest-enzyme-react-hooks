import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";
import languageContext from "./context/languageContext";
import successContext from "./context/successContext";
import guessedWordsContext from "./context/guessedWordsContext";

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  const wrapper = mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
  return wrapper;
};

describe("testing languageContext", () => {
  test("should render english text", () => {
    const wrapper = setup({});
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    expect(submitBtn.text()).toBe("Submit");
  });
  test("should render emoji text", () => {
    const wrapper = setup({ language: "emoji" });
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    expect(submitBtn.text()).toBe("🚀");
  });
});

test("should render without errors", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("should throw warning when wrong prop type", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("should call `currentGuess` when submit button is clicked", () => {
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    const mockSubmitEvent = { preventDefault: () => {} };
    submitBtn.simulate("click", mockSubmitEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

test("input component does not show when success is true", () => {
  const wrapper = setup({ success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
