import React from "react";
import PropTypes from "prop-types";

const LanguagePicker = ({ setLanguage }) => {
  const languages = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😊" }
  ];

  const languageIcons = languages.map(lang => (
    <span
      key={lang.code}
      data-test="language-icon"
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return <div data-test="language-picker-component">{languageIcons}</div>;
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired
};

export default LanguagePicker;
