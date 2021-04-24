import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishContext';
import Spinner from "../../utils/Spinner";

const WishList = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  },[])

  const {wishlist,handleWishlist} = useWishlist();
  const {cart, addToCart } = useCart();
  const [spinner,setSpinner] = useState(false);

  return (
      <div className="wishlist-container">
      <Spinner show={spinner}/>
        <h1 style={{textAlign: 'center'}}>Wishlist ({wishlist.length})</h1>
        <div style={{display: wishlist.length > 0 ? 'grid': "block"}}  className="products">
              {
                 wishlist.length > 0 ? wishlist.map( item => (
                    <div key={item._id} className={ item.stock ? "card" : "card out-of-stock"}>
                      <div className="remove-icon">
                        <i onClick={() => handleWishlist(item,setSpinner)} style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                      </div>
                      <img alt="product" className="card-img" src={item.image}/>
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <small className="card-content-details">Price:{item.price}</small>
                        { item.fastDelivery && <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>}
                      </div>
                      <button onClick={() => {
                         addToCart(item,setSpinner);
                         handleWishlist(item,setSpinner)
                        } } disabled={!item.stock || cart.find((i) => i.product._id === item._id)} className="primary-btn">{!item.stock
                          ? "Out of Stock"
                          : cart.find((i) => i.product._id === item._id)
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
