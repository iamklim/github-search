import React, { useEffect, useState } from "react";
import "./SearchResults.scss";

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
      {items && items.length > 0 && (
        <div className="results-table" role="table" aria-label="Search results">
          <div className="results-table__row" role="rowgroup">
            <div className="results-table__col" role="columnheader">
              Id
            </div>
            <div className="results-table__col" role="columnheader">
              Name and link
            </div>
            <div
              className="results-table__col results-table__col--desktop"
              role="columnheader"
            >
              Description
            </div>
            <div className="results-table__col" role="columnheader">
              Language
            </div>
            <div className="results-table__col" role="columnheader">
              Forks
            </div>
            <div className="results-table__col" role="columnheader">
              Stars
            </div>
          </div>

          {items.map((item) => (
            <div className="results-table__row" role="rowgroup" key={item.id}>
              <div
                className="results-table__col results-table__col--left"
                role="cell"
              >
                {item.id}
              </div>
              <div className="results-table__col" role="cell">
                <a href={item.html_url} target="_blank">
                  {item.name}
                </a>
              </div>
              <div
                className="results-table__col results-table__col--left results-table__col--desktop"
                role="cell"
              >
                {item.description}
              </div>
              <div className="results-table__col" role="cell">
                {item.language}
              </div>
              <div className="results-table__col" role="cell">
                {item.forks_count}
              </div>
              <div className="results-table__col" role="cell">
                {item.stargazers_count}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
