import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

/**
 * Create a wrapper
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
  React.useReducer = mockReducer;

  // Using mount, because shallow doesn't trigger useEffect
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
};

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("should run useEffect and setSecretWord", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test("if the `secretWord` does not update when the app re-renders", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("renders spinner when secretWord is null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.exists()).toBe(true);
  });
  test("does not render app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });
});
