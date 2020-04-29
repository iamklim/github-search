import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";

function Pagination({ pager, onPageChange, isLoading }) {
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
        } ${isDisabled || isLoading ? "pagination__list-item--disabled" : ""} ${
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
          isDisabled: pager.currentPage === 1,
          onClick: () => onPageChange(1),
        })}
        {generateItem({
          key: "page-prev",
          text: "Previous",
          isDisabled: pager.currentPage === 1,
          onClick: () => onPageChange(pager.currentPage - 1),
        })}
        {pager.pages &&
          pager.pages.map((page, index) =>
            generateItem({
              key: `page-${index}`,
              text: page,
              isActive: pager.currentPage === page,
              onClick: () => onPageChange(page),
              onlyDesktop: true,
            })
          )}
        {generateItem({
          key: "page-next",
          text: "Next",
          isDisabled: pager.currentPage === pager.totalPages,
          onClick: () => onPageChange(pager.currentPage + 1),
        })}
        {generateItem({
          key: "page-last",
          text: "Last",
          isDisabled: pager.currentPage === pager.totalPages,
          onClick: () => onPageChange(pager.totalPages),
        })}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  pager: PropTypes.object,
  onPageChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Pagination;
