import { useReducer,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

import axios from 'axios';

const CartReducer = () => {

    const navigate = useNavigate();
    const { isUserloggedIn,userDetails } = useAuth();

    useEffect( () => {
      ( async function(){
        try {
          const res = await axios.get("https://shopping-hub-2021.herokuapp.com/api/carts/"+userDetails?.uid);
          dispatch({ type: "INITIAL_STATE",payload:res.data.cart})
        } catch (error) {
          return []
        }
      } )()
    },[userDetails?.uid] )

    const cartReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return action.payload
            case "ADD_TO_CART":
            return [...state,action.payload]
            case "REMOVE_FROM_CART":
            return state.filter( i => i.productID !== action.payload)
            case "INCREASE_QTY":
            return state.map( i => i.productID === action.payload ? {...i,quantity:i.quantity + 1} : i )
            case "DECREASE_QTY":
            return state.map( i => i.productID === action.payload ? {...i,quantity:i.quantity - 1} : i )
            case "EMPTY_CART":
            return []
            default:
            return state;
        }
    }
    const [state, dispatch] = useReducer(cartReducer,[]);
   
    const addToCart = async(item) => {
        if (!isUserloggedIn) {
          return navigate("/login");
        }
        if (state.find((i) => i.productID === item._id)) {
          return navigate("/cart");
        }
        try {
          await axios.post("https://shopping-hub-2021.herokuapp.com/api/carts/"+userDetails?.uid,{productID:item._id,quantity:1});
          dispatch({ type: "ADD_TO_CART", payload: {productID:item._id,quantity:1} });
        } catch (error) {
           alert("something went wrong with server")
        }
        
    };

    const removeFromCart = async(productID) => {
        try {
           await axios.delete(`https://shopping-hub-2021.herokuapp.com/api/carts/${userDetails?.uid}/${productID}`)
           dispatch({ type:"REMOVE_FROM_CART",payload:productID })
        } catch (error) {
          alert("something went wrong with server")
        }
    }

    const increaseQuantityOfProduct = async(productID) => {
      try {
        await axios.post(`https://shopping-hub-2021.herokuapp.com/api/carts/${userDetails?.uid}/${productID}/increasequantity`)
        dispatch({ type:"INCREASE_QTY",payload:productID })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    const decreaseQuantityOfProduct = async(productID) => {
      try {
        await axios.post(`https://shopping-hub-2021.herokuapp.com/api/carts/${userDetails?.uid}/${productID}/decreasequantity`);
        dispatch({ type:"DECREASE_QTY",payload:productID })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    const emptyCart = async() => {
      try {
        await axios.delete(`https://shopping-hub-2021.herokuapp.com/api/carts/${userDetails?.uid}`);
        dispatch({ type:"EMPTY_CART" })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    return {cart:state,emptyCart,addToCart,increaseQuantityOfProduct,decreaseQuantityOfProduct,removeFromCart}
};

export default CartReducer;
