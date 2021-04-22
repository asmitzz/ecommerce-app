import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAddress} from "../../contexts/AddressContext";
import {useCart} from "../../contexts/CartContext";
import Backdrop from "../../utils/Backdrop";
import SuccessToast from "../../utils/SuccessToast";
import Spinner from "../../utils/Spinner";

import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";

const OrderSummary = () => {

    useEffect(() => {
        window.scroll({ behavior:'smooth',top:0 });
      },[])

    const {selectedAddress} = useAddress();
    const navigate = useNavigate();
    const { uid } = useAuth()

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cartItems,totalCartValue,emptyCart} = useCart();

    const [order,setOrder] = useState("");
    const [spinner,setSpinner] = useState("");

    const handleOrder = async() => {
        setSpinner(true)
        const orderDetails = {
           uid,
           products:cartItems.map( product => ({
                product:product._id,
                name:product.name,
                quantity:product.quantity,
                price:product.price
              }))
           ,
           address:selectedAddress
        }
        try {
             await axios.post("https://shopping-hub-2021.herokuapp.com/api/order",orderDetails);
             setSpinner(false);
             setOrder("Order Placed successfully");
             setTimeout( () => {
                navigate("/")
                emptyCart()
             },3000)
        } catch (error) {
          setSpinner(false);
          alert("something went wrong with server")
        }
        
    }

    return (
        <div className="order_summary_container">
          <SuccessToast show={order} className="order__successfull" background="#181818" color="#dab600"/>
          <Backdrop show={order}/>
          <Spinner show={spinner}/>
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
