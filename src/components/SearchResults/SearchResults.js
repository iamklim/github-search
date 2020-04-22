import React, { useEffect, useState } from "react";
import "./SearchResults.scss";
import Loader from "../Loader";

function SearchResults({ results }) {
  const [totalCount, setTotalCount] = useState(null);
  const [incompleteResults, setIncompleteResults] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (results) {
      const { total_count, incomplete_results, items } = results;
      setTotalCount(total_count);
      setIncompleteResults(incomplete_results);
      setItems(items);
    } else {
      setItems(null);
    }
  }, [results]);

  return (
    <div className="search-results">
      {items && (
        <ul className="search-results__list">
          {items.map((item) => (
            <li className="search-results__list-item" key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
