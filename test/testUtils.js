import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, expectedProps) => {
  const result = checkPropTypes(
    component.propTypes,
    expectedProps,
    "prop",
    component.name
  );

  expect(result).toBeUndefined();
};
