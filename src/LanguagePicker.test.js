import React from "react";
import { shallow } from "enzyme";

import LanguagePicker from "./LanguagePicker";
import { findByTestAttr, checkProps } from "../test/testUtils";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("should render without errors", () => {
  const wrapper = setup();
  const languageComponent = findByTestAttr(
    wrapper,
    "language-picker-component"
  );

  expect(languageComponent.exists()).toBe(true);
});

test("does not throw warning when wrong prop types are passed", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test("renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

test("calls setLanguage prop upon click", () => {
  const wrapper = setup();

  const languageIcons = findByTestAttr(wrapper, "language-icon");
  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
