import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import getPager from "../../services/getPager";
import { resultsPerPage } from "../../config";

import "./Pagination.scss";

function Pagination({ totalItems, setCurrentPage, isLoading }) {
  const [pager, setPager] = useState({});

  const setPage = (page) => {
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    const pagerUpdated = getPager(totalItems, page, resultsPerPage);

    setPager(pagerUpdated);
    setCurrentPage(page);
  };

  // go to fist page if totalItems has changed
  const prevTotalItems = useRef(null);
  useEffect(() => {
    if ((totalItems || totalItems === 0) && totalItems !== prevTotalItems) {
      prevTotalItems.current = totalItems;
      setPage(1);
    }
  }, [totalItems]);

  // generate single item of pagination
  const generateItem = ({
    key,
    text,
    isActive,
    isDisabled,
    onlyDesktop,
    onClick,
  }) => {
    return (
      <li
        key={key}
        className={`pagination__list-item ${
          isActive ? "pagination__list-item--active" : ""
        } ${isDisabled ? "pagination__list-item--disabled" : ""} ${
          onlyDesktop ? "pagination__list-item--desktop" : ""
        }`}
        onClick={onClick}
      >
        {text}
      </li>
    );
  };

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pagination if there is only one page
    return null;
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {generateItem({
          key: "page-first",
          text: "First",
          isDisabled: pager.currentPage === 1 || isLoading,
          onClick: () => setPage(1),
        })}
        {generateItem({
          key: "page-prev",
          text: "Previous",
          isDisabled: pager.currentPage === 1 || isLoading,
          onClick: () => setPage(pager.currentPage - 1),
        })}
        {pager.pages &&
          pager.pages.map((page, index) =>
            generateItem({
              key: `page-${index}`,
              text: page,
              isActive: pager.currentPage === page,
              isDisabled: isLoading,
              onClick: () => setPage(page),
              onlyDesktop: true,
            })
          )}
        {generateItem({
          key: "page-next",
          text: "Next",
          isDisabled: pager.currentPage === pager.totalPages || isLoading,
          onClick: () => setPage(pager.currentPage + 1),
        })}
        {generateItem({
          key: "page-last",
          text: "Last",
          isDisabled: pager.currentPage === pager.totalPages || isLoading,
          onClick: () => setPage(pager.totalPages),
        })}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  setCurrentPage: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Pagination;
