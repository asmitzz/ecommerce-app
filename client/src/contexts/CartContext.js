import React,{ createContext,useContext,useReducer } from 'react';
import CartReducer from '../reducers/CartReducer';

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const { cart,dispatch } = CartReducer();
    
    return(
        <cartContext.Provider value={{cart,dispatchCart:dispatch}}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};