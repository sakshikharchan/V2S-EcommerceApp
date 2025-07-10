// Shop.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, setSortOption } from '../redux/productSlice'; // update path
import Filters from '../Product/Filters';

const Shop = () => {
  const dispatch = useDispatch();

  const handleFilterChange = ({ filterType, value }) => {
    dispatch(setFilter({ filterType, value }));
  };

  const handleSortChange = ({ field, order }) => {
    dispatch(setSortOption({ field, order }));
  };

  return (
    <div>
      <Filters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default Shop;
