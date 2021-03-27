import React,{ useState } from 'react';

import Cart from './components/Cart';
import ProductListing from './components/ProductListing';
import WishList from './components/WishList';
import { useCart } from './contexts/CartContext';

import './App.css';
import { useWishlist } from './contexts/WishContext';

const App = () => {

  const [route,setRoute] = useState("ProductListing");
  const {cart} = useCart();
  const {wishlist} = useWishlist();

  return (
    
         <div>
           <nav className="nav">
              <ul>
                <li><i className="fa fa-bars"></i></li>
                <li style={{flex:1}} onClick={() => setRoute("ProductListing")}><h1>ShopingHub</h1></li>
                <li onClick={() => setRoute("WishList")}>
                   <i className="fa fa-heart"><span className="badge">{wishlist.length}</span></i>
                   <span className="icon-name">Wishlist</span> 
                </li>
                <li onClick={() => setRoute("Cart")}>
                   <i className="fa fa-shopping-cart"><span className="badge">{cart.length}</span></i>
                   <span className="icon-name">Cart</span>
                </li>
              </ul>
           </nav>
            
            { route === "ProductListing" && <ProductListing route={setRoute}/>}
            { route === "WishList" && <WishList/>}
            { route === "Cart" && <Cart/>}
         </div>
        
  );
};

export default App;
