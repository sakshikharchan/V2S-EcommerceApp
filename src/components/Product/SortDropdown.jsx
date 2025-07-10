
import React from 'react';

const SortDropdown = ({ sortOption, onSortChange }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === 'lowToHigh') {
      onSortChange({ field: 'price', order: 'asc' });
    } else if (value === 'highToLow') {
      onSortChange({ field: 'price', order: 'desc' });
    } else if (value === 'rating') {
      onSortChange({ field: 'rating', order: 'desc' });
    }
  };

  const styles = {
    select: {
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #ced4da',
      backgroundColor: '#fff',
      color: '#333',
      fontWeight: '500',
      minWidth: '180px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    label: {
      fontWeight: '600',
      marginRight: '10px',
      fontSize: '14px',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }
  };

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>Sort by:</label>
      <select onChange={handleChange} style={styles.select} defaultValue="">
        <option value="" disabled>
          Select
        </option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortDropdown;
