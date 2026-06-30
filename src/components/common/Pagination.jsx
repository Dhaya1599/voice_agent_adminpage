import React from "react";

function Pagination({ currentPage, totalPages = 3, onPageChange }) {
  return (
    <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i + 1} 
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
          style={{ margin: '0 5px' }}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;