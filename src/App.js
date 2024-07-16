import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/style.css";
import "./assets/js/custom.js";


import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BasePage from './Pages/BasePage';
import Store from "./store.js";
import { useEffect } from 'react';
import Login from './Pages/Login.jsx';
import { LoginAuth } from '../src/Pages/LoginAuth.jsx';
import { LogoutAuth } from '../src/Pages/LogoutAuth.jsx';
import Signup from './Pages/Signup.jsx';

import Home from './Pages/HomePage.jsx';
import AddPost from './Pages/AddPost.jsx';
import EditPost from './Pages/EditPost.jsx';
import Dashboard from './Pages/Dashboard.jsx';


function App() {


  useEffect(() => {

    AOS.init(); //You can add options as per your need inside an object

  }, [])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Store>
        <BrowserRouter>
          <Routes>

            <Route path='' element={<BasePage />}>
              <Route index element={<Home />} />
              <Route path="signup" element={<LogoutAuth><Signup /></LogoutAuth>} />
              <Route path="login" element={<LogoutAuth><Login /></LogoutAuth>} />

              <Route path="dashboard" element={<LoginAuth><Dashboard /></LoginAuth>} />
              <Route path="addpost" element={<LoginAuth><AddPost /></LoginAuth>} />
              <Route path="updatepost" element={<LoginAuth><EditPost /></LoginAuth>} />
            
            </Route>


          </Routes>
        </BrowserRouter>
      </Store>
    </>
  );
}

export default App;
