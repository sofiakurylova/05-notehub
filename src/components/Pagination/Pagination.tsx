

import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <ul className={css.pagination}>
      <li className={currentPage === 1 ? css.disabled : ''}>
        <a onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>&lt;</a>
      </li>
      {getPageNumbers().map((page, index) => (
        <li
          key={index}
          className={page === currentPage ? css.active : page === '...' ? css.ellipsis : ''}
        >
          <a onClick={() => typeof page === 'number' && onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
      <li className={currentPage === totalPages ? css.disabled : ''}>
        <a onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>&gt;</a>
      </li>
    </ul>
  );
}