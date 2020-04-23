import React, { useState } from "react";

import SearchForm from "../SearchForm";
import SearchResults from "../SearchResults";
import Suggestion from "../Suggestion";
import Pagination from "../Pagination";

import { initialLanguageList } from "../../config";

import "./App.scss";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [languages, setLanguages] = useState(initialLanguageList);
  const [sorting, setSorting] = useState("stars");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="app">
      <div className={`search ${isSearchOpen ? "search--open" : ""}`}>
        <SearchForm
          setIsSearchOpen={setIsSearchOpen}
          setResults={setResults}
          languages={languages}
          sorting={sorting}
          currentPage={currentPage}
        />
        <Suggestion
          languages={languages}
          setLanguages={setLanguages}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
      <Pagination
        totalItems={results && results.total_count}
        setCurrentPage={setCurrentPage}
      />
      <SearchResults results={results} />
    </main>
  );
}

export default App;
