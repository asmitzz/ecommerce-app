import React from "react";

import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import WishList from "./components/WishList";

import "./App.css";
import Header from './components/Header';
import DisplayAddresses from "./components/address-management/DisplayAddresses";
import EditAddress from "./components/address-management/EditAddress";
import AddNewAddress from "./components/address-management/AddNewAddress";
import OrderSummary from "./components/OrderSummary";

import { Routes,Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./auth/Login";

const App = () => {

  return (
    <div className="container">
      <Header/>
       <Routes>
          <Route path="/" element={<ProductListing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <PrivateRoute path="/address" element={<DisplayAddresses/>}/>
          <PrivateRoute path="/editaddress" element={<EditAddress/>}/>
          <PrivateRoute path="/newaddress" element={<AddNewAddress/>}/>
          <PrivateRoute path="/ordersummary" element={<OrderSummary/>}/>
       </Routes>

    </div>
  );
};

export default App;
