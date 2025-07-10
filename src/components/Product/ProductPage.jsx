// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductDetail from '../Product/ProductDetail';

// const ProductPage = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`/products/${id}`)
//             .then(res => {
//                 setProduct(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Failed to fetch product', err);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) return <div className="text-center my-5">Loading...</div>;
//     if (!product) return <div className="text-center text-danger my-5">Product not found</div>;

//     return <ProductDetail product={product} />;
// };

// export default ProductPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../Product/ProductDetail';
import { Button, Spinner, Alert } from 'react-bootstrap';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/products/${id}`); // Note: Added /api prefix
            setProduct(response.data);
        } catch (err) {
            console.error('Failed to fetch product', err);
            setError(err.response?.data?.message || 'Failed to load product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <Alert variant="danger">
                    <Alert.Heading>Error loading product</Alert.Heading>
                    <p>{error}</p>
                    <Button onClick={fetchProduct} variant="primary">
                        Retry
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container my-5">
                <Alert variant="warning">
                    Product not found
                </Alert>
            </div>
        );
    }

    return <ProductDetail product={product} />;
};

export default ProductPage;