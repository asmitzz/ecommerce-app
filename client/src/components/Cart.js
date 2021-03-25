import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {

  const {cart} = useCart();

  return (
        <div className="products">
              {
                cart.map( item => (
                    <div key={item.id} className="card">
                      <i style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img alt="product" className="card-img" src={item.image}/>
                      <button className="btn">move to cart</button>
                    </div>
                  ))
              }
        </div>
    );
};

export default Cart;
