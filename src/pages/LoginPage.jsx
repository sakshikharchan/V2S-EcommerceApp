
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Logging in with:', username, password);
//     // You can add login logic here (mock or API call)
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <style>{`
//         .login-box {
//           background-color: #ffffff;
//           padding: 40px 30px;
//           border-radius: 12px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           width: 100%;
//           max-width: 400px;
//         }
//         .login-box h2 {
//           margin-bottom: 25px;
//           font-weight: 600;
//           color: #333;
//         }
//         .login-links a {
//           font-size: 0.9rem;
//           margin-right: 10px;
//           color: #007bff;
//           text-decoration: none;
//         }
//         .login-links a:hover {
//           text-decoration: underline;
//         }
//       `}</style>

//       <div className="login-box">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-center">Login</h2>

//           <div className="form-group mb-3">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="form-control"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group mb-4">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="d-grid mb-3">
//             <button type="submit" className="btn btn-primary">
//               Log In
//             </button>
//           </div>

//           <div className="text-center login-links">
//             <a href="#">Forgot password?</a>
//             <a href="/register">Register</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login success
    if (username && password) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => navigate('/'), // Redirect to homepage after toast
      });
    } else {
      toast.error('Please enter username and password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />
      <style>{`
        .login-box {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-box h2 {
          margin-bottom: 25px;
          font-weight: 600;
          color: #333;
        }
        .login-links a {
          font-size: 0.9rem;
          margin-right: 10px;
          color: #007bff;
          text-decoration: none;
        }
        .login-links a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Login</h2>

          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>

          <div className="text-center login-links">
            <a href="#">Forgot password?</a>
            <a href="/Register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
