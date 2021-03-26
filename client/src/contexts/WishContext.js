import React,{ createContext,useContext } from 'react';
import WishlistReducer from '../reducers/WishlistReducer';

export const wishlistContext = createContext();

export const WishlistContextProvider = ({children}) => {

   const {wishlist,dispatch} = WishlistReducer()
    
    return(
        <wishlistContext.Provider value={{wishlist,dispatchWishlist:dispatch}}>
             {children}
        </wishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(wishlistContext)
};