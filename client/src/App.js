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

import MyAccount from "./pages/myaccount/MyAccount";
import YourOrders from "./pages/yourorders/YourOrders";
import IndividualProductPage from "./pages/IndividualProductPage/IndividualProductPage";
import RouteNotFound from "./utils/RouteNotFound";

import "./App.css";

const App = () => {

  const { isUserloggedIn } = useAuth();

  return (
    <div className="container">
       <Header/>
       <Routes>
          { !isUserloggedIn && <Route path="/login" element={<Login/>}/>}
          { !isUserloggedIn && <Route path="/signup" element={<SignUp/>}/>}

          <Route path="/" element={<ProductListing/>}/>
          <Route path="/products/:productId" element={<IndividualProductPage/>}/>
          
          <PrivateRoute path="/wishlist" element={<WishList/>}/>
          <PrivateRoute path="/cart" element={<Cart/>}/>
          <PrivateRoute path="/address" element={<DisplayAddresses/>}/>
          <PrivateRoute path="/editaddress" element={<EditAddress/>}/>
          <PrivateRoute path="/newaddress" element={<AddNewAddress/>}/>
          <PrivateRoute path="/ordersummary" element={<OrderSummary/>}/>
          <PrivateRoute path="/myaccount" element={<MyAccount/>}/>
          <PrivateRoute path="/orders" element={<YourOrders/>}/>
          
          <Route path="*" element={<RouteNotFound/>}/>
       </Routes>

    </div>
  );
};

export default App;
