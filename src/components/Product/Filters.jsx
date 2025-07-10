

import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ onFilterChange, onSortChange }) => {
  const categories = ['', 'Clothing', 'Footwear', 'Electronics'];
  const sizes = ['', 'S', 'M', 'L', 'XL'];
  const colors = ['', 'Blue', 'Red', 'Black', 'Green'];
  const brands = ['', 'Nike', 'Adidas', 'Puma', 'Reebok'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ filterType: name, value: value ? value.toLowerCase() : '' });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, order] = value.split('-');
    onSortChange({ field, order });
  };

  const formStyles = {
    backgroundColor: 'lightgray',
    marginTop: '10px',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const labelStyles = {
    fontWeight: '600',
    color: '#343a40',
    marginBottom: '10px',
  };

  const selectStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    backgroundColor: '#fff',
    transition: '0.2s ease-in-out',
  };

  const handleSelectFocus = (e) => {
    e.target.style.borderColor = '#007bff';
    e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)';
  };

  const handleSelectBlur = (e) => {
    e.target.style.borderColor = '#ced4da';
    e.target.style.boxShadow = 'none';
  };

  return (
    <Form style={formStyles} className="mb-4">
      <Row className="g-3">
        <Col md={2}>
          <Form.Group>
            <Form.Label style={labelStyles}>Category</Form.Label>
            <Form.Select
              name="category"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label style={labelStyles}>Size</Form.Label>
            <Form.Select
              name="size"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label style={labelStyles}>Color</Form.Label>
            <Form.Select
              name="color"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label style={labelStyles}>Brand</Form.Label>
            <Form.Select
              name="brand"
              onChange={handleFilterChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand || 'All'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label style={labelStyles}>Sort By</Form.Label>
            <Form.Select
              onChange={handleSortChange}
              onFocus={handleSelectFocus}
              onBlur={handleSelectBlur}
              style={selectStyles}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity-desc">Popularity</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
