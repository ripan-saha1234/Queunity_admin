import '../css/pagination.css';

const getPaginationNumbers = (currentPage, totalPages) => {
  const numbers = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else if (currentPage <= 3) {
    for (let i = 1; i <= 5; i++) {
      numbers.push(i);
    }
    numbers.push('...');
    numbers.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    numbers.push(1);
    numbers.push('...');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else {
    numbers.push(1);
    numbers.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      numbers.push(i);
    }
    numbers.push('...');
    numbers.push(totalPages);
  }

  return numbers;
};

const Pagination = ({ currentPage, totalPages, totalItems = 0, onPageChange }) => {
  if (!totalItems || totalPages < 1) return null;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination__nav"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
            <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="pagination__numbers">
          {getPaginationNumbers(currentPage, totalPages).map((number, index) => (
            <button
              key={`${number}-${index}`}
              type="button"
              onClick={() => typeof number === 'number' ? handlePageChange(number) : undefined}
              className={`pagination__number ${currentPage === number ? 'pagination__number--active' : ''} ${typeof number !== 'number' ? 'pagination__number--ellipsis' : ''}`}
              disabled={typeof number !== 'number'}
              aria-label={typeof number === 'number' ? `Page ${number}` : undefined}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination__nav"
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
