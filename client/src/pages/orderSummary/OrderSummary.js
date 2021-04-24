import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useAddress} from "../../contexts/AddressContext";
import {useCart} from "../../contexts/CartContext";
import Backdrop from "../../utils/Backdrop";
import Toast from "../../utils/Toast";
import Spinner from "../../utils/Spinner";

import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";

const OrderSummary = () => {

    const {selectedAddress} = useAddress();
    const navigate = useNavigate();
    const { uid } = useAuth();
    const path = useLocation()?.state?.from;

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cart,totalCartValue,emptyCart} = useCart();

    const [order,setOrder] = useState("");
    const [spinner,setSpinner] = useState("");
    const [toast,setToast] = useState("");

    useEffect(() => {
      window.scroll({ behavior:'smooth',top:0 });
      if(path !== "address"){
        navigate("*")
      }
    },[path,navigate])

    const handleOrder = async() => {
        setSpinner(true)
        const orderDetails = {
           uid,
           products:cart.map( i => ({
                product:i.product._id,
                name:i.product.name,
                quantity:i.quantity,
                price:i.product.price
              }))
           ,
           address:selectedAddress
        }
        try {
             await axios.post("https://shopping-hub-2021.herokuapp.co/api/order",orderDetails);
             setSpinner(false);
             setOrder("Order Placed successfully");
             setTimeout( () => {
                navigate("/")
                emptyCart()
             },3000)
        } catch (error) {
          setSpinner(false);
          setToast("Something went wrong with server");
          setTimeout( () => {
            setToast("")
         },3000)
        }
        
    }

    return (
        <div className="order_summary_container">
          <Toast show={order} className="toast__content" background="#181818" color="#dab600"/>
          <Toast show={toast} error={true} className="toast__content" background="red" color="white"/>
          
          <Backdrop show={order || toast} onClick={() => setToast("")}/>
          <Spinner show={spinner}/>
            <h2 className="order_summary_container_header">Order Summary</h2>
            <div>
                <p><strong>Delivered to:</strong>&nbsp;<small> {name}, {address} ,{city?.toUpperCase()} , {state?.toUpperCase()} , {locality} , {pincode} , India</small></p>
                <ul>
                   {
                       cart.map( i => (
                           <li key={i.product._id}>
                              <h5>{i.product.name}</h5>
                              <div className="order_summary">
                                <img alt="" width="150" height="100" src={i.product.image}/>
                                <div className="order_summary_content">
                                  <small>Price : ₹{i.product.price}</small>
                                  <small>Quantity : {i.quantity}</small>
                                  <small><strong>Total price : ₹{i.quantity*i.product.price}</strong></small>
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
