import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../Product/ProductCard.jsx'; // Adjust the import path as necessary

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/products?category=${category.toLowerCase()}`)
      .then(res => setProducts(res.data));
  }, [category]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize">{category} Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
