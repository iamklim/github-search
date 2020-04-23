import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Input from "../Input";
import Button from "../Button";
import { IconCross, IconSearch } from "../Icons";

import debounce from "../../services/deboune";
import getRepositories from "../../services/getRepositories";

import useEventListener from "../../hooks/useEventListener";

import "./SearchForm.scss";

function SearchForm({
  setIsSearchOpen,
  setResults,
  languages,
  sorting,
  currentPage,
  setIsLoading,
}) {
  const [inputValue, setInputValue] = useState("");
  const inputSearchRef = useRef(null);

  const CancelToken = axios.CancelToken;
  const cancelTokenSource = CancelToken.source();

  const openSearch = () => {
    setIsSearchOpen(true);
    inputSearchRef.current.focus();
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    inputSearchRef.current.blur();
  };

  const checkEscapeAndEnter = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      closeSearch();
    }
  };
  useEventListener("keyup", checkEscapeAndEnter);

  const performSearch = async (value) => {
    try {
      setIsLoading(true);
      const response = await getRepositories({
        query: value,
        page: currentPage,
        sort: sorting,
        languages,
        cancelTokenSource,
      });

      if (response && response.status === 200) {
        setResults(response.data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // new search when one of parameters is updated
  useEffect(() => {
    if (languages || sorting || currentPage) {
      const inputValueTrimmed = inputValue.trim();
      if (inputValueTrimmed.length > 2) {
        performSearch(inputValueTrimmed);
      }
    }
  }, [languages, sorting, currentPage]);

  // debouncing request for 500 msec to wait when user
  // finishes typing to avoid unnecessary requests
  const debouncedSearch = debounce((value) => {
    performSearch(value);
  }, 500);

  // New requests are sent on keyup
  const onKeyUpHandler = (e) => {
    const targetValue = e.target.value.trim();

    if (targetValue.length > 2) {
      debouncedSearch(targetValue);
    }
    // else {
    //   setResults(null);
    // }
  };

  // Previous requests canceled on keydown
  const onKeyDownHandler = (e) => {
    if (e.keyCode !== 13) {
      // Not Enter
      cancelTokenSource.cancel("Request canceled");
    }
  };

  return (
    <>
      <Button
        className="btn--search-close"
        icon={<IconCross />}
        onClick={closeSearch}
      />
      <div className="search__form">
        <Input
          ref={inputSearchRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          onFocus={openSearch}
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
  setIsSearchOpen: PropTypes.func,
  setResults: PropTypes.func,
  languages: PropTypes.array,
  sorting: PropTypes.string,
  currentPage: PropTypes.number,
  setIsLoading: PropTypes.func,
};

export default SearchForm;
