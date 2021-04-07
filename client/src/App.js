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

import { Switch,Route } from 'react-router-dom';

const App = () => {

  return (
    <div className="container">
      <Header/>

       <Switch>
          <Route path="/" exact component={ProductListing}/>
          <Route path="/wishlist" exact component={WishList}/>
          <Route path="/cart" exact component={Cart}/>
          <Route path="/address" exact component={DisplayAddresses}/>
          <Route path="/editaddress" exact component={EditAddress}/>
          <Route path="/newaddress" exact component={AddNewAddress}/>
          <Route path="/ordersummary" exact component={OrderSummary}/>
       </Switch>

    </div>
  );
};

export default App;
