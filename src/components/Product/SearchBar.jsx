import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/slices/productSlice';
import { ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = query && showSuggestions
    ? products
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <div
      ref={searchRef}
      style={{
        position: 'relative',
        minWidth: '550px',
        maxWidth: '400px',
        zIndex: 1055,
      }}
    >
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
        <Button
          variant="outline-light"
          onClick={handleSearch}
          style={{ backgroundColor: '#333', color: '#fff' }}
        >
          <FaSearch />
        </Button>
      </InputGroup>

      {showSuggestions && suggestions.length > 0 && (
        <ListGroup
          style={{
            position: 'absolute',
            width: '100%',
            top: '100%',
            left: 0,
            zIndex: 1055,
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '0 0 6px 6px',
            marginTop: '4px',
            border: '1px solid #ddd',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((product, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => {
                setQuery(product.name);
                dispatch(setSearchQuery(product.name));
                setShowSuggestions(false);
              }}
              style={{
                cursor: 'pointer',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {highlightText(product.name, query)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

// ✅ Highlight matched search term inside product name
const highlightText = (text, query) => {
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} style={{ color: 'blue', fontWeight: '600' }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default SearchBar;
