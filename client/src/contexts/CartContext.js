import React,{ createContext,useContext } from 'react';
import CartReducer from '../reducers/CartReducer';

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const { cart,dispatch,totalCartValue,totalCartItem } = CartReducer();
    
    return(
        <cartContext.Provider value={{cart,dispatchCart:dispatch,totalCartValue,totalCartItem}}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};