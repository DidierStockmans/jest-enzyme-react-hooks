import moxios from "moxios";

import { getSecretWord } from "./hookActions";

describe("test getting the secret word", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("`getSecretWord` should set the secret word using `setSecretWord` hook", async () => {
    const secretWord = "party";
    const mockSetSecretWord = jest.fn();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    await getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
