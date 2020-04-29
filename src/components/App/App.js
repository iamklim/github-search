import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../Loader";
import Pagination from "../Pagination";
import SearchForm from "../SearchForm";
import SearchResults from "../SearchResults";
import Suggestion from "../Suggestion";

import debounce from "../../services/deboune";
import getPager from "../../services/getPager";
import getRepositories from "../../services/getRepositories";

import { initialLanguageList, resultsPerPage } from "../../config";

import "./App.scss";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState(null);
  const [languages, setLanguages] = useState(initialLanguageList);
  const [sorting, setSorting] = useState("stars");
  const [pager, setPager] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const CancelToken = axios.CancelToken;
  const cancelTokenSource = CancelToken.source();

  const itemsFound = results && results.items;
  const itemsTotalCount = results && results.total_count;

  const onInputChange = (e) => setInputValue(e.target.value);

  const openSearch = (inputRef) => {
    try {
      setIsSearchOpen(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeSearch = (inputRef) => {
    try {
      setIsSearchOpen(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setPage = (page, totalItems = itemsTotalCount) => {
    try {
      // get new pager object for specified page
      const pagerUpdated = getPager(totalItems, page, resultsPerPage);

      setPager(pagerUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const performSearch = async (value, pageNumber) => {
    try {
      setIsLoading(true);
      const response = await getRepositories({
        query: value,
        page: pageNumber,
        sort: sorting,
        languages,
        cancelTokenSource,
      });

      if (response && response.status === 200) {
        setResults(response.data);

        if (pageNumber) {
          setPage(pageNumber);
        } else {
          setPage(1, response.data.total_count);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const trimValueAndSearch = (value, pageNumber) => {
    const valueTrimmed = value.trim();
    if (valueTrimmed.length > 2) {
      performSearch(valueTrimmed, pageNumber);
    }
  };

  // new search when one of parameters is updated
  useEffect(() => {
    if (languages || sorting) {
      trimValueAndSearch(inputValue);
    }
  }, [languages, sorting]);

  // debouncing request for 500 msec to wait when user
  // finishes typing to avoid unnecessary requests
  const debouncedSearch = debounce((value) => {
    trimValueAndSearch(value);
  }, 500);

  // New requests are sent on keyup
  const onKeyUpHandler = (e) => debouncedSearch(e.target.value);

  // Previous requests are canceled on keydown if not Enter pressed
  const onKeyDownHandler = (e) => {
    if (e.keyCode !== 13) {
      cancelTokenSource.cancel("Request canceled");
    }
  };

  const onLanguageChange = (value) => {
    const languagesUpdated = [...languages];
    setLanguages(
      languagesUpdated.map((language) =>
        value === language.key
          ? { ...language, isEnabled: !language.isEnabled }
          : language
      )
    );
  };

  const onSortingChange = (e) => setSorting(e.target.value);

  const onPageChange = (pageNumber) =>
    trimValueAndSearch(inputValue, pageNumber);

  return (
    <main className="app">
      <div className={`search ${isSearchOpen ? "search--open" : ""}`}>
        <Loader isLoading={isLoading} />
        <SearchForm
          inputValue={inputValue}
          onInputChange={onInputChange}
          openSearch={openSearch}
          closeSearch={closeSearch}
          onKeyUpHandler={onKeyUpHandler}
          onKeyDownHandler={onKeyDownHandler}
        />
        <Suggestion
          languages={languages}
          onLanguageChange={onLanguageChange}
          sorting={sorting}
          onSortingChange={onSortingChange}
        />
      </div>
      <Pagination
        pager={pager}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
      <SearchResults itemsFound={itemsFound} />
    </main>
  );
}

export default App;
