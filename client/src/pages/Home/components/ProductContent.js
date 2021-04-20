import { useState } from "react";
import { useCart } from "../../../contexts/CartContext";
import { useWishlist } from "../../../contexts/WishContext";
import BtnSpinner from '../../../utils/BtnSpinner';

const ProductContent = ({item}) => {

    const { cartItems,addToCart } = useCart();
    const { wishlist ,handleWishlist} = useWishlist();
    const [loaderForCart,setLoaderForCart] = useState(false);
    const [loaderForWishlist,setLoaderForWishlist] = useState(false);

    return (
        <div key={item._id} className={item.stock ? "card" : "card out-of-stock"}>

            <div className="wishlist-icon">
              {  !loaderForWishlist && 
                 <button className="wishlist-button" onClick={() => handleWishlist(item,setLoaderForWishlist)} >
                   <i style={{ color: wishlist.find((i) => i?._id === item?._id) ? "#dab600" : "#181818"}} className="fa fa-heart" aria-hidden="true"></i>
                 </button>
              }
              <BtnSpinner show={loaderForWishlist}/> 
            </div>

            <img alt="product" className="card-img" src={item.image+`?random=${Math.round(Math.random() * 1000)}`} />

            <div className="card-content">
              <h4>{item.name}</h4>
              <small className="card-content-details">Price:{item.price}</small>
              {item.fastDelivery && (
                <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>
              )}
            </div>

            <button onClick={() => addToCart(item,setLoaderForCart)}  className="primary-btn" disabled={(!item?.stock || loaderForCart)} >
              { !loaderForCart && (item.stock ? (cartItems.find((i) => i?._id === item?._id) ? "Go to cart" : "Add to cart") : "Out of cart")}
              <BtnSpinner show={loaderForCart}/>
            </button>
            
          </div>
    )
}

export default ProductContent;
