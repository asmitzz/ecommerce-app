import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishContext";
import Spinner from "../../utils/Spinner";

const Cart = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  },[])

  const navigate = useNavigate();

  const { wishlist, handleWishlist } = useWishlist();
  const [spinner,setSpinner] = useState(false);
  
  const { 
    cartItems,
    decreaseQuantityOfProduct,
    increaseQuantityOfProduct,
    removeFromCart,
    totalCartValue,
    totalCartItem 
  } = useCart();

  return (
    <div className="cart-container">
      <Spinner show={spinner}/>
      <h1>My Cart({totalCartItem})</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="card-horizontal">
            <img alt="product" className="card-img" src={item.image} />
            <div className="card-body">
              <h4 className="card-title">
                {item.name}(<span>{item.material}</span>)
              </h4>
              <small>Seller: {item.seller}</small>
              <div>
                <small>₹{item.price}</small>&nbsp;
                <button
                  disabled={item.quantity <= 1}
                  onClick={() => decreaseQuantityOfProduct(item._id,setSpinner)}
                >
                  -
                </button>
                &nbsp;{item.quantity}&nbsp;
                <button
                  onClick={() =>increaseQuantityOfProduct(item._id,setSpinner)}
                >
                  +
                </button>
              </div>
              <div className="card-footer">
               <div className="wishlist-icon">
               <i 
                  onClick={() => handleWishlist(item,setSpinner)}
                  style={{
                    color: wishlist.find((i) => i._id === item._id)
                      ? "red"
                      : "white",
                  }}
                  className="fa fa-heart fa-border"
                  aria-hidden="true"
                ></i>
               </div>
                <button
                  onClick={() => removeFromCart(item._id,setSpinner)}
                  className="secondary-btn"
                  style={{
                    padding:'0.2rem 0.5rem',
                    borderRadius:'2px'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>Your cart is empty</p>
      )}
      {cartItems.length > 0 && (
        <>
          <h2>Total Price: ₹{totalCartValue}</h2>
          <button
            className="primary-btn"
            onClick={() => navigate('/address')}
          >
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
