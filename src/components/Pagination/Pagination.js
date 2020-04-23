import React, { useEffect, useRef, useState } from "react";
import { resultsPerPage } from "../../config";
import "./Pagination.scss";

function Pagination({ totalItems, setCurrentPage }) {
  const [pager, setPager] = useState({});

  const getPager = (totalItems, currentPage, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

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
    if (totalItems && totalItems !== prevTotalItems) {
      prevTotalItems.current = totalItems;
      setPage(1);
    }
  }, [totalItems]);

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={pager.currentPage === page ? "active" : ""}
          >
            <a onClick={() => setPage(page)}>{page}</a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
