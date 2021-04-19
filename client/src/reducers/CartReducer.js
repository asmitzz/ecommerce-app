import { useReducer,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

import axios from 'axios';

const CartReducer = () => {

    const navigate = useNavigate();
    const { isUserloggedIn,uid } = useAuth();

    useEffect( () => {
      ( async function(){
        try {
          const res = await axios.get("http://localhost:5000/api/carts/"+uid);
          dispatch({ type: "INITIAL_STATE",payload:res.data.cart})
        } catch (error) {
          return []
        }
      } )()
    },[uid] )

    const cartReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return action.payload
            case "ADD_TO_CART":
            return [...state,action.payload]
            case "REMOVE_FROM_CART":
            return state.filter( i => i.product._id !== action.payload)
            case "INCREASE_QTY":
            return state.map( i => i.product._id === action.payload ? {...i,quantity:i.quantity + 1} : i )
            case "DECREASE_QTY":
            return state.map( i => i.product._id === action.payload ? {...i,quantity:i.quantity - 1} : i )
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
        if (state.find((i) => i.product._id === item._id)) {
          return navigate("/cart");
        }
        try {
          await axios.post("http://localhost:5000/api/carts/"+uid,{productID:item._id,quantity:1});
          dispatch({ type: "ADD_TO_CART", payload: {product:item,quantity:1} });
        } catch (error) {
           alert("something went wrong with server")
        }
        
    };

    const removeFromCart = async(productID) => {
        try {
           await axios.delete(`http://localhost:5000/api/carts/${uid}/${productID}`)
           dispatch({ type:"REMOVE_FROM_CART",payload:productID })
        } catch (error) {
          alert("something went wrong with server")
        }
    }

    const increaseQuantityOfProduct = async(productID) => {
      try {
        await axios.post(`http://localhost:5000/api/carts/${uid}/${productID}/increasequantity`)
        dispatch({ type:"INCREASE_QTY",payload:productID })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    const decreaseQuantityOfProduct = async(productID) => {
      try {
        await axios.post(`http://localhost:5000/api/carts/${uid}/${productID}/decreasequantity`);
        dispatch({ type:"DECREASE_QTY",payload:productID })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    const emptyCart = async() => {
      try {
        await axios.delete(`http://localhost:5000/api/carts/${uid}`);
        dispatch({ type:"EMPTY_CART" })
     } catch (error) {
       alert("something went wrong with server")
     }
    }

    return {cart:state,emptyCart,addToCart,increaseQuantityOfProduct,decreaseQuantityOfProduct,removeFromCart}
};

export default CartReducer;
