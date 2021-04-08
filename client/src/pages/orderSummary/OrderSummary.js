import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAddress} from '../../contexts/AddressContext';
import {useCart} from '../../contexts/CartContext';

const OrderSummary = () => {

    useEffect(() => {
        window.scroll(0,0)
    }, [])

    const {selectedAddress} = useAddress();
    const navigate = useNavigate();

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cart,totalCartValue,dispatchCart} = useCart();

    return (
        <div className="order_summary_container">
            <h2 className="order_summary_container_header">Order Summary</h2>
            <div>
                <p>Delivered to:<small> {name}, {address} ,{city.toUpperCase()} , {state.toUpperCase()} , {locality} , {pincode} , India</small></p>
                <ul>
                   {
                       cart.map( i => (
                           <li key={i.id}>
                              <h5>{i.name}</h5>
                              <div className="order_summary">
                                <img alt="" width="150" height="100" src={i.image}/>
                                <div className="order_summary_content">
                                  <small>Price : ₹{i.price}</small>
                                  <small>Quantity : {i.qty}</small>
                                  <small>Total price : ₹{i.qty*i.price}</small>
                                </div>
                              </div>
                           </li>
                       ))
                   }
                </ul>
                <div className="final_checkout">
                  <h5 className="totalCartValue">Total Cart Value : ₹{totalCartValue}</h5>
                  <button className="primary-btn" onClick={() =>{ 
                      alert("Order successfull!!")
                      navigate("/")
                      dispatchCart({ type: "EMPTY_CART"})
                      }}>Place order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;
