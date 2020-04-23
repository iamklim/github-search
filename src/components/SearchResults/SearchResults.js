import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./SearchResults.scss";

function SearchResults({ results }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (results && results.items) {
      setItems(results.items);
    } else {
      setItems(null);
    }
  }, [results]);

  const itemsAvailable = items && items.length > 0;
  const headerTitles = [
    "Id",
    "Name and link",
    "Description",
    "Language",
    "Forks",
    "Stars",
  ];

  const tableHeader = (
    <div className="results-table__row" role="rowgroup">
      {headerTitles.map((title, index) => (
        <div
          key={`header-${index}`}
          className="results-table__col"
          role="columnheader"
        >
          {title}
        </div>
      ))}
    </div>
  );

  const tableBody =
    items &&
    items.map((item) => {
      const {
        id,
        html_url,
        name,
        description,
        language,
        forks_count,
        stargazers_count,
      } = item;
      return (
        <div className="results-table__row" role="rowgroup" key={id}>
          <div
            className="results-table__col results-table__col--left"
            role="cell"
          >
            {id}
          </div>
          <div className="results-table__col" role="cell">
            <a href={html_url} target="_blank">
              {name}
            </a>
          </div>
          <div
            className="results-table__col results-table__col--left results-table__col--desktop"
            role="cell"
          >
            {description}
          </div>
          <div className="results-table__col" role="cell">
            {language}
          </div>
          <div className="results-table__col" role="cell">
            {forks_count}
          </div>
          <div className="results-table__col" role="cell">
            {stargazers_count}
          </div>
        </div>
      );
    });

  return (
    <div className="search-results">
      {itemsAvailable && (
        <div className="results-table" role="table" aria-label="Search results">
          {tableHeader}
          {tableBody}
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.object,
};

export default SearchResults;
