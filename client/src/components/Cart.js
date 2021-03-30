import React from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";

const Cart = ({ route }) => {
  const { wishlist, dispatchWishlist } = useWishlist();
  const { cart, dispatchCart, totalCartValue, totalCartItem } = useCart();
  const addToWishlist = (item) => {
    if (wishlist.find((i) => i.id === item.id)) {
      return dispatchWishlist({
        type: "REMOVE_FROM_WISHLIST",
        payload: item.id,
      });
    }
    dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: item });
  };
  return (
    <div className="cart-container">
      <h1>My Cart({totalCartItem})</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="card-horizontal">
            <img alt="product" className="card-img" src={item.image} />
            <div className="card-body">
              <h3 className="card-title">
                {item.name}(<span>{item.material}</span>)
              </h3>
              <span>Seller: {item.seller}</span>
              <div>
                <p>₹{item.price}</p>
                <button
                  disabled={item.qty <= 1}
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_QTY", payload: item.id })
                  }
                >
                  -{" "}
                </button>
                &nbsp;{item.qty}&nbsp;
                <button
                  onClick={() =>
                    dispatchCart({ type: "ADD_QTY", payload: item.id })
                  }
                >
                  +
                </button>
              </div>
              <div className="card-footer">
                <i 
                  onClick={() => addToWishlist(item)}
                  style={{
                    color: wishlist.find((i) => i.id === item.id)
                      ? "red"
                      : "white",
                  }}
                  className="fa fa-heart fa-border"
                  aria-hidden="true"
                ></i>
                <button
                  onClick={() =>
                    dispatchCart({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="secondary-btn"
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
            onClick={() => route("DisplayAddresses")}
          >
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
