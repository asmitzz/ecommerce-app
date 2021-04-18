import { useCart } from "../../../contexts/CartContext";
import { useWishlist } from "../../../contexts/WishContext";

const ProductContent = ({item}) => {

    const { cart,addToCart } = useCart();
    const { wishlist ,addToWishlist} = useWishlist();

    return (
        <div key={item._id} className={item.stock ? "card" : "card out-of-stock"}>

            <div className="wishlist-icon">
              <i onClick={() => addToWishlist(item)} style={{ color: wishlist.find((i) => i._id === item._id) ? "red" : "white"}} className="fa fa-heart" aria-hidden="true"></i>
            </div>

            <img alt="product" className="card-img" src={item.image+`?random=${Math.round(Math.random() * 1000)}`} />

            <div className="card-content">
              <h4>{item.name}</h4>
              <small className="card-content-details">Price:{item.price}</small>
              {item.fastDelivery && (
                <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>
              )}
            </div>

            <button onClick={() => addToCart(item)}  className="primary-btn" disabled={!item.stock} >
              { item.stock ? (cart.find((i) => i.productID === item._id) ? "Go to cart" : "Add to cart") : "Out of cart"}
            </button>
            
          </div>
    )
}

export default ProductContent;
