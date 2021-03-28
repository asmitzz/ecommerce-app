import React, { useState } from "react";

import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import WishList from "./components/WishList";
import { useCart } from "./contexts/CartContext";

import "./App.css";
import { useWishlist } from "./contexts/WishContext";
import DisplayAddresses from "./components/address-management/DisplayAddresses";
import EditAddress from "./components/address-management/EditAddress";
import AddNewAddress from "./components/address-management/AddNewAddress";

const App = () => {
  const [route, setRoute] = useState("AddNewAddress");
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="container">
      <nav className="nav">
        <ul>
          <li>
            <i className="fa fa-bars"></i>
          </li>
          <li style={{ flex: 1 }} onClick={() => setRoute("ProductListing")}>
            <h1>ShoppingHub</h1>
          </li>
          <li onClick={() => setRoute("WishList")}>
            <i className="fa fa-heart">
              <span className="badge">{wishlist.length}</span>
            </i>
            <span className="icon-name">Wishlist</span>
          </li>
          <li onClick={() => setRoute("Cart")}>
            <i className="fa fa-shopping-cart">
              <span className="badge">{cart.length}</span>
            </i>
            <span className="icon-name">Cart</span>
          </li>
        </ul>
      </nav>

      {route === "ProductListing" && <ProductListing route={setRoute} />}
      {route === "WishList" && <WishList />}
      {route === "Cart" && <Cart route={setRoute}/>}
      {route === "DisplayAddresses" && <DisplayAddresses route={setRoute}/>}
      {route === "EditAddress" && <EditAddress route={setRoute}/>}
      {route === "AddNewAddress" && <AddNewAddress route={setRoute}/>}
      
    </div>
  );
};

export default App;
