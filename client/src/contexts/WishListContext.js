import React, { createContext,useReducer } from 'react';

export const wishlistContext = createContext();

export const WishlistContextProvider = ({children}) => {
    
    const wishlistReducer = (state,action) => {
        switch (action.type){
            case "ADDTOWISHLIST":
            return {...state,wishlist:[...state.wishlist,action.item]}
            case "REMOVEFROMWISHLIST":
            return {...state,wishlist:state.wishlist.filter( i => i.id !== action.id )}
        }
        return state;
    };

    const [state,dispatch] = useReducer(wishlistReducer,{wishlist:[]});

    return(
        <wishlistContext.Provider value={{ wishlist:state.wishlist,dispatchWishlist:dispatch }}>
            {children}
        </wishlistContext.Provider>
    );
};
