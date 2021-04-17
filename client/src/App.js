import React from "react";

import { Routes,Route } from 'react-router-dom';

import Header from './utils/Header';
import PrivateRoute from "./utils/PrivateRoute";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

import Cart from "./pages/Cart/Cart";
import ProductListing from "./pages/Home/ProductListing";
import WishList from "./pages/Wishlist/WishList";
import DisplayAddresses from "./pages/address/DisplayAddresses";
import EditAddress from "./pages/address/components/EditAddress";
import AddNewAddress from "./pages/address/components/AddNewAddress";
import OrderSummary from "./pages/orderSummary/OrderSummary";

import { useAuth } from "./contexts/AuthContext";

import "./App.css";
import MyAccount from "./pages/myaccount/MyAccount";
import ForgetPassword from "./auth/ForgetPassword";

const App = () => {

  const { isUserloggedIn } = useAuth();

  return (
    <div className="container">
      <Header/>
       <Routes>
          <Route path="/" element={<ProductListing/>}/>

          { !isUserloggedIn && <Route path="/login" element={<Login/>}/>}
          { !isUserloggedIn && <Route path="/signup" element={<SignUp/>}/>}
          { !isUserloggedIn && <Route path="/resetpassword" element={<ForgetPassword/>}/>}

          <PrivateRoute path="/wishlist" element={<WishList/>}/>
          <PrivateRoute path="/cart" element={<Cart/>}/>
          <PrivateRoute path="/address" element={<DisplayAddresses/>}/>
          <PrivateRoute path="/editaddress" element={<EditAddress/>}/>
          <PrivateRoute path="/newaddress" element={<AddNewAddress/>}/>
          <PrivateRoute path="/ordersummary" element={<OrderSummary/>}/>
          <PrivateRoute path="/myaccount" element={<MyAccount/>}/>
       </Routes>

    </div>
  );
};

export default App;
