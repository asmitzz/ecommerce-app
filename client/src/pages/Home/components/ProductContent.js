import { useState } from "react";
import { useCart } from "../../../contexts/CartContext";
import { useWishlist } from "../../../contexts/WishContext";
import { Link } from 'react-router-dom';
import BtnSpinner from '../../../utils/BtnSpinner';
import Toast from '../../../utils/Toast';

const ProductContent = ({item}) => {

    const { cart,addToCart } = useCart();
    const { wishlist ,handleWishlist} = useWishlist();
    const [loaderForCart,setLoaderForCart] = useState(false);
    const [loaderForWishlist,setLoaderForWishlist] = useState(false);
    const [error,setError] = useState(false);

    return (
        <div key={item._id} className={item.stock ? "card" : "card out-of-stock"}>
            <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="red" color="white"/>
            <div className="wishlist-icon">
              {  !loaderForWishlist && 
                 <button className="wishlist-button" onClick={() => handleWishlist(item,setLoaderForWishlist,setError)} >
                   <i style={{ color: wishlist.find((i) => i?._id === item?._id) ? "var(--danger-color)" : "var(--tertiary)"}} className="fa fa-heart" aria-hidden="true"></i>
                 </button>
              }
              <BtnSpinner show={loaderForWishlist}/> 
            </div>

            <Link to={`/products/${item._id}`}>
              <img alt="product" className="card-img" src={item.image+`?random=${Math.round(Math.random() * 1000)}`} />
            </Link>

            <div className="card-content">
              <h4>{item.name}</h4>
              <small className="card-content-details">Price:{item.price}</small>
              {item.fastDelivery && (
                <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>
              )}
            </div>

            <button onClick={() => addToCart(item,setLoaderForCart,setError)}  className="primary-btn" disabled={(!item?.stock || loaderForCart)} >
              { !loaderForCart && (item.stock ? (cart.find((i) => i?.product._id === item?._id) ? "Go to cart" : "Add to cart") : "Out of stock")}
              <BtnSpinner show={loaderForCart}/>
            </button>
            
          </div>
    )
}

export default ProductContent;
