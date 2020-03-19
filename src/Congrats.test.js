import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";
import languageContext from "./context/languageContext";
import successContext from "./context/successContext";

/**
 * Factory functoin to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {Object} props Component props
 * @returns {$hallowWrapper}
 */
const setup = ({ success, language }) => {
  language = language || "en";
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in english", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "congrats-component");
    expect(component.text()).toBe("Congratulations! You guessed the word!");
  });
  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    const component = findByTestAttr(wrapper, "congrats-component");
    expect(component.text()).toBe("🎉");
  });
});

test("renders without errors", () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttr(wrapper, "congrats-component");
  expect(component.length).toBe(1);
});

test("renders no text when `success` is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "congrats-component");
  expect(component.text()).toBe("");
});

test("renders text when `success` is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
