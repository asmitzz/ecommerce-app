import { useReducer } from 'react';

const WishlistReducer = () => {
    const wishlistReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_WISHLIST":
            return {...state,wishlist:[...state.wishlist,action.payload]};
            case "REMOVE_FROM_WISHLIST":
            return {...state,wishlist:state.wishlist.filter( i => i._id !== action.payload)}
            default:
            return state;
        }
    }

    const [{wishlist}, dispatch] = useReducer(wishlistReducer,{wishlist:[]});
 
    const addToWishlist = (item) => {
        if (wishlist.find((i) => i._id === item._id)) {
          return dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: item._id,
          });
        }
        dispatch({ type: "ADD_TO_WISHLIST", payload: item });
    };

    return {wishlist,dispatch,addToWishlist}
};

export default WishlistReducer;
