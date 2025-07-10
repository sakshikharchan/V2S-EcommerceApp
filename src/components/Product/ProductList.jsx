// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts, setFilter, setSortOption } from '../../redux/slices/productSlice';
// import ProductCard from './ProductCard';
// import Filters from '../../components/Product/Filters'; // The styled dropdown version

// const ProductList = ({ category }) => {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.products);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const limit = 12;

//   // Load on mount and category change
//   useEffect(() => {
//     setSkip(0);
//     dispatch(fetchProducts({ category, limit, skip: 0 }));
//   }, [category, dispatch]);

//   // Watch product list and apply local filters
//   useEffect(() => {
//     setFilteredItems(items); // If needed, apply further filtering logic here
//   }, [items]);

//   const handleFilterChange = (filterObj) => {
//     const [filterType] = Object.keys(filterObj);
//     const [value] = filterObj[filterType];
//     dispatch(setFilter({ filterType, value }));
//   };

//   const handleSortChange = (value) => {
//     let field = 'price';
//     let order = 'asc';

//     if (value === 'price-desc') order = 'desc';
//     else if (value === 'popularity-desc') field = 'popularity';

//     dispatch(setSortOption({ field, order }));
//   };

//   const handleLoadMore = () => {
//     const newSkip = skip + limit;
//     dispatch(fetchProducts({ category, limit, skip: newSkip }));
//     setSkip(newSkip);
//   };

//   return (
//     <div className="container my-4">
//       <Filters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

//       <div className="row">
//         {loading && skip === 0 ? (
//           <div className="text-center py-5">Loading...</div>
//         ) : error ? (
//           <div className="alert alert-danger">Error: {error}</div>
//         ) : filteredItems.length > 0 ? (
//           filteredItems.map((product) => (
//             <div className="col-md-4 mb-4" key={product.id}>
//               <ProductCard product={product} />
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <div className="alert alert-info">No products match your filters.</div>
//           </div>
//         )}
//       </div>

//       {filteredItems.length >= limit && (
//         <div className="text-center mt-4">
//           <button className="btn btn-primary" onClick={handleLoadMore}>
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setFilter, setSortOption } from '../../redux/slices/productSlice';
import ProductCard from './ProductCard';
import Filters from '../../components/Product/Filters';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [filteredItems, setFilteredItems] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  useEffect(() => {
    setSkip(0);
    dispatch(fetchProducts({ category, limit, skip: 0 }));
  }, [category, dispatch]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleFilterChange = ({ filterType, value }) => {
    dispatch(setFilter({ filterType, value }));
  };

  const handleSortChange = ({ field, order }) => {
    dispatch(setSortOption({ field, order }));
  };

  const handleLoadMore = () => {
    const newSkip = skip + limit;
    dispatch(fetchProducts({ category, limit, skip: newSkip }));
    setSkip(newSkip);
  };

  return (
    <div className="container my-4">
      <Filters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      <div className="row">
        {loading && skip === 0 ? (
          <div className="text-center py-5">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">Error: {error}</div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">No products match your filters.</div>
          </div>
        )}
      </div>

      {filteredItems.length >= limit && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
