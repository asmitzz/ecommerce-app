import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAddress} from '../../contexts/AddressContext';
import {useCart} from '../../contexts/CartContext';
import Backdrop from '../../utils/Backdrop';
import SuccessToast from '../../utils/SuccessToast';
import Spinner from '../../utils/Spinner';

const OrderSummary = () => {

    useEffect(() => {
        window.scroll({ behavior:'smooth',top:0 });
      },[])

    const {selectedAddress} = useAddress();
    const navigate = useNavigate();

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cartItems,totalCartValue,emptyCart} = useCart();

    const [order,setorder] = useState("");

    const handleOrder = () => {
        setorder("Order Placed Succesfully")
        // navigate("/")
        // emptyCart()
    }


    return (
        <div className="order_summary_container">
          <SuccessToast show={order} className="order__successfull" background="#181818" color="#dab600"/>
          <Backdrop show={order}/>
          <Spinner show={order}/>
            <h2 className="order_summary_container_header">Order Summary</h2>
            <div>
                <p><strong>Delivered to:</strong>&nbsp;<small> {name}, {address} ,{city?.toUpperCase()} , {state?.toUpperCase()} , {locality} , {pincode} , India</small></p>
                <ul>
                   {
                       cartItems.map( i => (
                           <li key={i._id}>
                              <h5>{i.name}</h5>
                              <div className="order_summary">
                                <img alt="" width="150" height="100" src={i.image}/>
                                <div className="order_summary_content">
                                  <small>Price : ₹{i.price}</small>
                                  <small>Quantity : {i.quantity}</small>
                                  <small><strong>Total price : ₹{i.quantity*i.price}</strong></small>
                                </div>
                              </div>
                           </li>
                       ))
                   }
                </ul>
                <div className="final_checkout">
                  <h5 className="totalCartValue">Total Cart Value : ₹{totalCartValue}</h5>
                  <button className="primary-btn" onClick={handleOrder}>Place order
                  </button>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default OrderSummary;
