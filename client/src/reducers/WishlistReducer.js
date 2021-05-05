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
          dispatch({ type:"UPDATE_WISHLIST",payload:res?.data?.wishlist})
        } catch (error) {
          return dispatch({ type:"UPDATE_WISHLIST",payload:[]})
        }
      } )()
    },[uid] )

    const wishlistReducer = (state,action) => {
        switch (action.type) {
            case "UPDATE_WISHLIST":
            return action.payload
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
            const {data,status} = await axios.delete(`https://shopping-hub-2021.herokuapp.com/api/wishlists/${uid}/${item._id}`)
            if(status === 200){
              loader(false)
              return dispatch({type: "UPDATE_WISHLIST",payload: data.wishlist.products});
            }
          }
           const {data,status} = await axios.post(`https://shopping-hub-2021.herokuapp.com/api/wishlists/${uid}`,{productID:item._id})
           if(status === 200){
            loader(false)
            return dispatch({type: "UPDATE_WISHLIST",payload: data.wishlist.products});
          }
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
