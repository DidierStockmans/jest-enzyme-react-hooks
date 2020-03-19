import React from "react";
import successContext from "./successContext";
import { shallow, mount } from "enzyme";

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test("should throw an error when `useSuccess` hook is used outside of a SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow(`useSuccess most be used within a SuccessProvider`);
});

test("should not throw an error when `useSuccess` hook is used within a SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow(`useSuccess most be used within a SuccessProvider`);
});
