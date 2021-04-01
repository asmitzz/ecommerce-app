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
import OrderSummary from "./components/OrderSummary";

const App = () => {
  const [route, setRoute] = useState("ProductListing");
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
      {route === "OrderSummary" && <OrderSummary route={setRoute}/> }

      <footer className="footer">
        <div className="footer-header">Connect with me on Social media</div>
        <ul className="list-non-bullet ">
          <li className="list-item-inline social">
            <a className="link" href="https://github.com/asmitzz">
              <img
                alt="social-media"
                loading="lazy"
                src="https://img.icons8.com/fluent/50/000000/github.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://www.instagram.com/smit_asmit008/">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/instagram-new.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://twitter.com/ASMITSHRIVASTA9">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/twitter.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a
              className="link"
              href="https://www.linkedin.com/in/asmit-shrivastava-3b94a3189/"
            >
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/linkedin-circled.png"
              />
            </a>
          </li>
        </ul>
      </footer>
      
    </div>
  );
};

export default App;
