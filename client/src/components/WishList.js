import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishContext';

const WishList = () => {

  useEffect(() => {
    window.scroll(0,0)
  }, [])

  const {wishlist,dispatchWishlist} = useWishlist();
  const {cart, dispatchCart } = useCart();
  
    return (
      <div className="wishlist-container">
        <h1 style={{textAlign: 'center'}}>Wishlist ({wishlist.length})</h1>
        <div style={{display: wishlist.length > 0 ? 'grid': "block"}}  className="products">
              {
                 wishlist.length > 0 ? wishlist.map( item => (
                    <div key={item.id} className={ item.inStock ? "card" : "card out-of-stock"}>
                      <div className="remove-icon">
                        <i onClick={() => dispatchWishlist({ type:"REMOVE_FROM_WISHLIST",payload:item.id })} style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                      </div>
                      <img alt="product" className="card-img" src={item.image}/>
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <small className="card-content-details">Price:{item.price}</small>
                        { item.fastDelivery && <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery available</small>}
                      </div>
                      <button onClick={() => {
                        dispatchCart({ type:"ADD_TO_CART" , payload:item });
                        dispatchWishlist({ type:"REMOVE_FROM_WISHLIST",payload:item.id });
                        } } disabled={!item.inStock || cart.find((i) => i.id === item.id)} className="primary-btn">{!item.inStock
                          ? "Out of Stock"
                          : cart.find((i) => i.id === item.id)
                          ? "Already in cart"
                          : "Move to cart"}</button>
                    </div>
                  ))
              : <p style={{textAlign:'center'}}>nothing in wishlist</p>}
        </div>
        </div>
    );
};

export default WishList;
