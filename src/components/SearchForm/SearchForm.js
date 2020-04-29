import React, { useRef } from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import Input from "../Input";

import useEventListener from "../../hooks/useEventListener";

import { IconCross, IconSearch } from "../Icons";

import "./SearchForm.scss";

function SearchForm({
  inputValue,
  onInputChange,
  openSearch,
  closeSearch,
  onKeyUpHandler,
  onKeyDownHandler,
}) {
  const inputSearchRef = useRef(null);

  const checkEscapeAndEnter = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      closeSearch(inputSearchRef);
    }
  };
  useEventListener("keyup", checkEscapeAndEnter);

  return (
    <>
      <Button
        className="btn--search-close"
        icon={<IconCross />}
        onClick={() => closeSearch(inputSearchRef)}
      />
      <div className="search__form">
        <Input
          ref={inputSearchRef}
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          onFocus={() => openSearch(inputSearchRef)}
          className="search__input"
          name="search"
          type="search"
        />
        <Button className="btn--search" icon={<IconSearch />} />
      </div>
    </>
  );
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  openSearch: PropTypes.func,
  closeSearch: PropTypes.func,
  onKeyUpHandler: PropTypes.func,
  onKeyDownHandler: PropTypes.func,
};

export default SearchForm;
