import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {}
};

describe("Testing the stringModule", () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(function() {
    console.warn = originalWarn;
  });
  test("returns correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns the correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toEqual("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage("french", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      `There's no string found for french with key submit`
    );
  });

  test("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("mermish", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      `There's no string found for mermish with key submit`
    );
  });
});
