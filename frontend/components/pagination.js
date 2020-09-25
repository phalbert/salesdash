import React from 'react';
import { range } from 'lodash';
import classnames from 'classnames';


export const Pagination = ({ page, total, limit, setPage }) => {

  const totalPages = Math.ceil(total / limit);
  const startPage = Math.max(1, page - 5);
  const endPage = Math.min(startPage + 9, totalPages);
  const pages = range(startPage, endPage + 1);

  return (
    <div className="pagination">
      <button
        disabled={page <= 1}
        className="icon-button arrow previous focus:outline-none"
        onClick={() => setPage(1)}>
        First
      </button>
      <button
        disabled={page <= 1}
        className="icon-button arrow previous focus:outline-none"
        onClick={() => setPage(page - 1)}>
        <i className="fa fa-chevron-left text-black" />
      </button>
      <div className="pages">
        {pages.map(pageNo => (
          <div
            key={pageNo}
            className={classnames('page', { active: pageNo === page })}
            onClick={() => setPage(pageNo)}>
            {pageNo}
          </div>
        ))}
      </div>
      <button
        disabled={page >= totalPages}
        className="icon-button arrow next focus:outline-none"
        onClick={() => setPage(page + 1)}>
        <i className="fa fa-chevron-right text-black" />
      </button>
      <button
        disabled={page >= totalPages}
        className="icon-button arrow next focus:outline-none"
        onClick={() => setPage(totalPages)}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
