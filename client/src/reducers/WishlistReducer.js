import { useEffect, useReducer } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const WishlistReducer = () => {
  
    const navigate = useNavigate();
    const { isUserloggedIn,uid } = useAuth();

    useEffect( () => {
      ( async function(){
        try {
          const res = await axios.get("https://shopping-hub-2021.herokuapp.com/api/wishlists/"+uid);
          dispatch({ type:"INITIAL_STATE",payload:res?.data?.wishlist})
        } catch (error) {
          return dispatch({ type:"INITIAL_STATE",payload:[]})
        }
      } )()
    },[uid] )

    const wishlistReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return action.payload
            case "ADD_TO_WISHLIST":
            return [...state,action.payload];
            case "REMOVE_FROM_WISHLIST":
            return state.filter( i => i._id !== action.payload)
            default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(wishlistReducer,[]);

    const handleWishlist = async(item,loader,toast) => {
      if (!isUserloggedIn) {
        return navigate("/login");
      }
        loader(true)
        
        try {
          if (state.find((i) => i._id === item._id)) {
            await axios.delete(`https://shopping-hub-2021.herokuapp.com/api/wishlists/${uid}/${item._id}`)
            loader(false)
            return dispatch({type: "REMOVE_FROM_WISHLIST",payload: item._id,});
          }
           await axios.post(`https://shopping-hub-2021.herokuapp.com/api/wishlists/${uid}`,{productID:item._id})
           dispatch({ type: "ADD_TO_WISHLIST", payload: item });
           loader(false)
        } catch (error) {
          loader(false)
          toast(true)
          setTimeout( () => {
            toast(false)
          },2000) 
        }
    };

    return {wishlist:state,dispatch,handleWishlist}
};

export default WishlistReducer;
