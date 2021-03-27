import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishContext';

const Cart = () => {
  const {dispatchWishlist} = useWishlist();
  const {cart,dispatchCart} = useCart();
  const price = () => {
    return cart.reduce( (total,i) => parseInt(total) + parseInt(i.price*i.qty) , 0)
  }

  const totalItem = () => {
     return cart.reduce( (total,i) => parseInt(total) + parseInt(i.qty) , 0)
  }

  return (
        <div className="cart-container">
          <h1>My Cart({ totalItem() })</h1>
              {
                cart.map( item => (
                    <div key={item.id} className="card-horizontal">
                        <img alt="product" className="card-img" src={item.image}/>
                      <div className="card-body">
                         <h3 className="card-title">{item.name}(
                         <span>{item.material}</span>)</h3>
                         <span>Seller: {item.seller}</span>
                         <div>
                           <p>₹{item.price}</p>
                           <button disabled={item.qty <= 1} onClick={() => dispatchCart({ type:"REMOVE_QTY",payload:item.id })}>- </button>
                            {item.qty}
                           <button onClick={() => dispatchCart({ type:"ADD_QTY",payload:item.id })}> +</button>
                         </div>
                         <div className="card-footer">
                           <button onClick={() => {
                             dispatchWishlist({ type:"ADD_TO_WISHLIST",payload:item })
                             dispatchCart({ type:"REMOVE_FROM_CART",payload:item.id })
                           }} className="primary-btn" style={{margin:'0.2rem'}}>SAVE TO WISHLIST</button>
                           <button onClick={() => dispatchCart({ type:"REMOVE_FROM_CART",payload:item.id })} className="secondary-btn">REMOVE</button>
                         </div>
                      </div>
                    </div>
                  ))
              }
            { cart.length > 0 && <h2>Total Price: ₹{price()}</h2>}
        </div>
    );
};

export default Cart;
