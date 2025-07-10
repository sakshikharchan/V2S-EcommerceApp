// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home.jsx';
// import ProductPage from './components/Product/ProductPage.jsx';
// import Checkout from '../src/components/Checkout/Checkout.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';
// import { Navbar, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'react-toastify/dist/ReactToastify.css';
// import LoginPage from './pages/LoginPage.jsx';
// import CategoryPage from './components/Product/CategoryPage.jsx';
// import './App.css';

// function App() {
//   return (
//     <Router>

//       <Container className="mt-0">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/LoginPage" element={<LoginPage />} />
//           {/* Add more routes as needed */}
//            <Route path="/category/:category" element={<CategoryPage />} />

//         </Routes>
//       </Container>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetail from './components/Product/ProductDetail.jsx'; // 👈 Direct import
import Checkout from './components/Checkout/Checkout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CategoryPage from './components/Product/CategoryPage.jsx';
import ProductList from './components/Product/ProductList.jsx'; // 👈 Direct import
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './components/Product/Filters.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Container className="mt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* ✅ Fixed route */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/Shop" element={<Shop />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
