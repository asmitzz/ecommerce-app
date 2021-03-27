import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ProductContextProvider } from './contexts/ProductContext';
import { CartContextProvider } from './contexts/CartContext';
import { WishlistContextProvider } from './contexts/WishContext';


ReactDOM.render(
  <React.StrictMode>
    <ProductContextProvider>
      <WishlistContextProvider>
       <CartContextProvider>
          <App />
          </CartContextProvider>
       </WishlistContextProvider>
    </ProductContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);