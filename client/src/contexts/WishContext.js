import React,{ createContext,useContext } from 'react';
import WishlistReducer from '../reducers/WishlistReducer';

export const wishlistContext = createContext();

export const WishlistContextProvider = ({children}) => {

   const {wishlist,dispatch,addToWishlist} = WishlistReducer()
    
    return(
        <wishlistContext.Provider value={{wishlist,dispatchWishlist:dispatch,addToWishlist}}>
             {children}
        </wishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(wishlistContext)
};