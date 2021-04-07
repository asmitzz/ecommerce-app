import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ProductContextProvider } from './contexts/ProductContext';
import { CartContextProvider } from './contexts/CartContext';
import { WishlistContextProvider } from './contexts/WishContext';
import { AddressContextProvider } from './contexts/AddressContext';

import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <AddressContextProvider>
      <ProductContextProvider>
        <WishlistContextProvider>
         <CartContextProvider>
           <Router>
            <App />
           </Router>
         </CartContextProvider>
       </WishlistContextProvider>
     </ProductContextProvider>
    </AddressContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);