import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishContext';

const WishList = () => {

  const {wishlist,dispatchWishlist} = useWishlist();
  const { dispatchCart } = useCart();
  
    return (
      <div className="wishlist-container">
        <h1 style={{textAlign: 'center'}}>Wishlist ({wishlist.length})</h1>
        <div style={{display: wishlist.length > 0 ? 'grid': "block"}}  className="products">
              {
                 wishlist.length > 0 ? wishlist.map( item => (
                    <div key={item.id} className={ item.inStock ? "card" : "card out-of-stock"}>
                      <div className="removeIcon">
                      <i onClick={() => dispatchWishlist({ type:"REMOVE_FROM_WISHLIST",payload:item.id })} style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                      </div>
                      <img alt="product" className="card-img" src={item.image}/>
                      <div className="card-content">
                        <h3>{item.name}</h3>
                        <span>Price:{item.price}</span>
                        <span>{ item.inStock ? "Instock" : "out of stock" }</span>
                        { item.fastDelivery && <span style={{flex: 1}}>Fast Delivery available</span>}
                      </div>
                      <button onClick={() => {
                        dispatchCart({ type:"ADD_TO_CART" , payload:item });
                        dispatchWishlist({ type:"REMOVE_FROM_WISHLIST",payload:item.id });
                        } } disabled={!item.inStock} className="primary-btn">{!item.inStock ? "Out of Stock" : "Move to cart"}</button>
                    </div>
                  ))
              : <p style={{textAlign:'center'}}>nothing in wishlist</p>}
        </div>
        </div>
    );
};

export default WishList;
