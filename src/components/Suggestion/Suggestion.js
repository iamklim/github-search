import React from "react";
import "./Suggestion.scss";
import RadioButton from "../RadioButton";

function Suggestion({ languages, setLanguages, sorting, setSorting }) {
  const onLanguageSelect = (value) => {
    const languagesUpdated = [...languages];
    setLanguages(
      languagesUpdated.map((language) =>
        value === language.key
          ? { ...language, isEnabled: !language.isEnabled }
          : language
      )
    );
  };

  const languageList = languages && (
    <ul className="language-list">
      {languages.map((language) => (
        <li
          key={language.key}
          className={`language-list__item ${
            language.isEnabled ? "language-list__item--active" : ""
          }`}
          onClick={() => onLanguageSelect(language.key)}
        >
          {language.title}
        </li>
      ))}
    </ul>
  );

  const onSortingChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div className="search__suggestion">
      <h3>
        Write Github repo name and hit Enter. Click to filter results by
        language:
      </h3>
      {languageList}
      <div className="sorting-form">
        <span className="sorting-form__title">Sort results by</span>
        <RadioButton
          text="Stars"
          value="stars"
          checked={sorting === "stars"}
          onChange={onSortingChange}
        />
        <RadioButton
          text="Forks"
          value="forks"
          checked={sorting === "forks"}
          onChange={onSortingChange}
        />
      </div>
    </div>
  );
}

export default Suggestion;
