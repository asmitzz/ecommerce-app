import React, { useState } from "react";

import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import WishList from "./components/WishList";

import "./App.css";
import Header from './components/Header';
import DisplayAddresses from "./components/address-management/DisplayAddresses";
import EditAddress from "./components/address-management/EditAddress";
import AddNewAddress from "./components/address-management/AddNewAddress";
import OrderSummary from "./components/OrderSummary";

const App = () => {
  const [route, setRoute] = useState("ProductListing");
  

  return (
    <div className="container">

      <Header route={setRoute}/>      

      {route === "ProductListing" && <ProductListing route={setRoute} />}
      {route === "WishList" && <WishList />}
      {route === "Cart" && <Cart route={setRoute}/>}
      {route === "DisplayAddresses" && <DisplayAddresses route={setRoute}/>}
      {route === "EditAddress" && <EditAddress route={setRoute}/>}
      {route === "AddNewAddress" && <AddNewAddress route={setRoute}/>}
      {route === "OrderSummary" && <OrderSummary route={setRoute}/> }

    </div>
  );
};

export default App;
