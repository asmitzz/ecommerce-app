import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishContext";

const Cart = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  })

  const navigate = useNavigate();

  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart, totalCartValue, totalCartItem } = useCart();

  const addToWishlist = (item) => {
    if (wishlist.find((i) => i._id === item._id)) {
      return dispatchWishlist({
        type: "REMOVE_FROM_WISHLIST",
        payload: item._id,
      });
    }
    dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: item });
  };

  return (
    <div className="cart-container">
      <h1>My Cart({totalCartItem})</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
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
                  disabled={item.qty <= 1}
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_QTY", payload: item._id })
                  }
                >
                  -
                </button>
                &nbsp;{item.qty}&nbsp;
                <button
                  onClick={() =>
                    dispatchCart({ type: "ADD_QTY", payload: item._id })
                  }
                >
                  +
                </button>
              </div>
              <div className="card-footer">
               <div className="wishlist-icon">
               <i 
                  onClick={() => addToWishlist(item)}
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
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_FROM_CART", payload: item._id })
                  }
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
      {cart.length > 0 && (
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
