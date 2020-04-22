import React, { useRef, useState } from "react";

import Button from "../Button";
import Input from "../Input";
import { IconSearch, IconCross } from "../Icons";

import useEventListener from "../../hooks/useEventListener";

import "./App.scss";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputSearchRef = useRef(null);

  const openSearch = () => {
    setIsSearchOpen(true);
    inputSearchRef.current.focus();
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    inputSearchRef.current.blur();
    setInputValue("");
  };

  const checkEscape = (e) => {
    if (e.keyCode === 27) {
      closeSearch();
    }
  };

  useEventListener("keyup", checkEscape);

  return (
    <main className="app">
      <div className={`search ${isSearchOpen ? "search--open" : ""}`}>
        <Button
          className="btn--search-close"
          icon={<IconCross />}
          onClick={closeSearch}
        />
        <form className="search__form" action="">
          <Input
            ref={inputSearchRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={openSearch}
            className="search__input"
            name="search"
            type="search"
          />
          <Button className="btn--search" icon={<IconSearch />} />
        </form>
        <div className="search__suggestion">
          <h3>Please enter Github repo name</h3>
          <p>
            #drone #funny #catgif #broken #lost #love #hilarious #good #red
            #blue #nono #why #yes #yesyes #aliens #green #fancy #pants #trees
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
