import React from 'react';
import { useProducts } from '../contexts/ProductContext';

const WishList = () => {

  const {wishlist} = useProducts();
  
    return (
        <div className="products">
              {
                wishlist.map( item => (
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

export default WishList;
