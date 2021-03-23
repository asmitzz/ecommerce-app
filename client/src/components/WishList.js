import React,{ useContext } from 'react';
import { wishlistContext } from '../contexts/WishListContext';

const WishList = () => {

    const {wishlist} = useContext(wishlistContext);

    return (
        <div className="products">
              {
                wishlist.map( item => (
                    <div key={item.id} className="card">
                      <i style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img className="card-img" src={item.image}/>
                      <button className="btn">move to cart</button>
                    </div>
                  ))
              }
        </div>
    );
};

export default WishList;
