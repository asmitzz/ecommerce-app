import { useReducer,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

import axios from 'axios';

const CartReducer = () => {

    const navigate = useNavigate();
    const { isUserloggedIn,userDetails } = useAuth();

    const {uid} = userDetails;

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
            return state.filter( i => i._id !== action.payload)
            case "ADD_QTY":
            return state.map( i => i._id === action.payload ? {...i,qty:i.qty + 1} : i )
            case "REMOVE_QTY":
            return state.map( i => i._id === action.payload ? {...i,qty:i.qty - 1} : i )
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
        if (state.find((i) => i._id === item._id)) {
          return navigate("/cart");
        }
        try {
          await axios.post("http://localhost:5000/api/carts/"+uid,{productID:item._id,quantity:1});
          dispatch({ type: "ADD_TO_CART", payload: {...item,quantity:1} });
        } catch (error) {
           alert("something went wrong with server")
        }
        
    };

    return {cart:state,dispatch,addToCart}
};

export default CartReducer;
