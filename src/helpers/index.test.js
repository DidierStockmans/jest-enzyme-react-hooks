import { getLetterMatchCount } from "./";

describe("Testing the helper function letter match count", () => {
  const secretWord = "party";
  test("should return 0 if no letters match", () => {
    const count = getLetterMatchCount("hindi", secretWord);
    expect(count).toBe(0);
  });
  test("should return 3 if 3 letters match", () => {
    const count = getLetterMatchCount("train", secretWord);
    expect(count).toBe(3);
  });
  test("should not count the same letter multiple times", () => {
    const count = getLetterMatchCount("parka", secretWord);
    expect(count).toBe(3);
  });
});
