import React,{ createContext,useContext } from 'react';
import CartReducer from '../reducers/CartReducer';

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const { cart,dispatch,totalCartValue,totalCartItem,addToCart } = CartReducer();
    
    return(
        <cartContext.Provider value={{cart,dispatchCart:dispatch,totalCartValue,totalCartItem,addToCart}}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};