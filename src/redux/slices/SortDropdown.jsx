import React from 'react';

const SortDropdown = ({ sortOption, onSortChange }) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="sortDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort: {sortOptions.find(opt => opt.value === sortOption)?.label}
      </button>
      <ul className="dropdown-menu" aria-labelledby="sortDropdown">
        {sortOptions.map(option => (
          <li key={option.value}>
            <button
              className={`dropdown-item ${sortOption === option.value ? 'active' : ''}`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;