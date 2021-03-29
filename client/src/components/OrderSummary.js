import React from 'react';
import {useAddress} from '../contexts/AddressContext';
import {useCart} from '../contexts/CartContext';

const OrderSummary = ({route}) => {

    const {selectedAddress} = useAddress();

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cart,totalCartValue} = useCart();

    return (
        <div className="order_summary_container">
            <h2>Order Summary</h2>
            <div>
                <p>Delivered to:<small> {name}, {address} ,{city.toUpperCase()} , {state.toUpperCase()} , {locality} , {pincode} , India</small></p>
                <ul>
                   {
                       cart.map( i => (
                           <li key={i.id}>
                              <h4>{i.name}</h4>
                              <div className="order_summary">
                                <img alt="" width="150" height="100" src={i.image}/>
                                <div className="order_summary_content">
                                  <span>Price : {i.price}</span>
                                  <span>Quantity : {i.qty}</span>
                                  <span>Total price : {i.qty*i.price}</span>
                                </div>
                              </div>
                           </li>
                       ))
                   }
                </ul>
                <div className="final_checkout">
                  <h5 className="totalCartValue">Total Cart Value : {totalCartValue}</h5>
                  <button className="primary-btn" onClick={() =>{ 
                      alert("Order successfull!!")
                      route("ProductListing")
                      }}>Place order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;
