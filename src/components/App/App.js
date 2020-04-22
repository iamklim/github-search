import React, { useState } from "react";
import SearchForm from "../SearchForm";
import SearchResults from "../SearchResults";
import "./App.scss";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState(null);

  return (
    <main className="app">
      <div className={`search ${isSearchOpen ? "search--open" : ""}`}>
        <SearchForm setIsSearchOpen={setIsSearchOpen} setResults={setResults} />
        <div className="search__suggestion">
          <h3>Write Github repo name and hit Enter</h3>
          <p>
            #drone #funny #catgif #broken #lost #love #hilarious #good #red
            #blue #nono #why #yes #yesyes #aliens #green #fancy #pants #trees
          </p>
        </div>
        <SearchResults results={results} />
      </div>
    </main>
  );
}

export default App;
