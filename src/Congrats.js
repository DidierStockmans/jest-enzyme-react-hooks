import React from "react";

import languageContext from "./context/languageContext";
import successContext from "./context/successContext";
import stringModule from "./helpers/strings";
/**
 * Functional React component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = () => {
  const [success] = successContext.useSuccess();
  const language = React.useContext(languageContext);

  if (success) {
    return (
      <div data-test="congrats-component" className="alert alert-success">
        <span data-test="congrats-message">
          {stringModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="congrats-component" />;
  }
};

export default Congrats;
