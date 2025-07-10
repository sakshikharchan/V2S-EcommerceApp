E-COMMERCE PRODUCT FILTER APP
=============================

DESCRIPTION:
------------
This is a simple e-commerce product listing application built using:
- React (Frontend)
- Redux Toolkit (State Management)
- JSON Server (Mock Backend)

Users can:
- Filter products by category, size, color, brand, and price.
- Sort products by price or popularity.
- Load more products dynamically.

------------------------------------
PROJECT STRUCTURE:
------------------
src/
├── components/
│   └── Product/
│       └── Filters.jsx       // Dropdown filters component
├── pages/
│   └── ProductList.jsx       // Main page with filter logic and product display
├── redux/
│   └── slices/
│       └── productSlice.js   // Redux slice with actions and async thunks
├── App.jsx
└── index.js

------------------------------------
GETTING STARTED:
-----------------

1. INSTALL DEPENDENCIES
-----------------------
> npm install

2. START JSON SERVER
--------------------
Ensure you have a db.json file in your project root.
Run:
> npx json-server --watch db.json --port 5000

JSON Server will be available at: http://localhost:5000/products

3. START THE REACT APP
----------------------
> npm start

This will run the app at: http://localhost:3000

------------------------------------
db.json SAMPLE:
----------------
{
  "products": [
    {
      "id": 1,
      "title": "Nike Air Max",
      "category": "Footwear",
      "size": ["M", "L"],
      "color": "Red",
      "brand": "Nike",
      "price": 5000,
      "popularity": 90
    }
  ]
}

------------------------------------
FEATURES:
---------
- Product listing with styled product cards
- Filters by:
  * Category
  * Size
  * Color
  * Brand
  * Price Range
- Sort by:
  * Price (Low to High / High to Low)
  * Popularity
- Pagination: Load more button

------------------------------------
TROUBLESHOOTING:
----------------
If you get the error:
> "onFilterChange is not a function"

Make sure:
1. You're passing the `onFilterChange` and `onSortChange` props correctly to the `<Filters />` component.
2. The parent component (like `Shop.jsx` or `ProductList.jsx`) defines and passes those handler functions.

------------------------------------
AUTHOR:
-------
Built by: Sakshi Kharchan
GitHub: https://github.com/sakshikharchan
