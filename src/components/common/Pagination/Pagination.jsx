import React from "react";
import "./style.css";

function Pagination({ currentPage, totalPages , onPageChange }) {
  return (
    <div className="pagination-controls" style={{ marginTop: '35px', textAlign: 'center' }}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
      &larr; 
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i + 1} 
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
          style={{ margin: '0 7px' }}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;