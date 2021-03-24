import React,{ useState } from 'react';

import Cart from './components/Cart';
import ProductListing from './components/ProductListing';
import WishList from './components/WishList';

import './App.css';
import { ProductContextProvider } from './contexts/ProductContext';

const App = () => {

  const [route,setRoute] = useState("ProductListing");

  return (
    <ProductContextProvider>
       <div>
          <button onClick={() => setRoute("ProductListing")}>Home</button>
          <button onClick={() => setRoute("WishList")}>WishList</button>
          <button onClick={() => setRoute("Cart")}>Cart</button>
          { route === "ProductListing" && <ProductListing/>}
          { route === "WishList" && <WishList/>}
          { route === "Cart" && <Cart/>}
       </div>
    </ProductContextProvider>
  );
};

export default App;
