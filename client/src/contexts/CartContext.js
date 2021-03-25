import React,{ createContext,useContext,useReducer } from 'react';

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const cartReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_CART":
            return {...state,cart:[...state.cart,action.payload]};
            default:
            return state;
        }
    }

    const [{cart}, dispatch] = useReducer(cartReducer,{cart:[]})
    
    return(
        <cartContext.Provider value={{cart,dispatchCart:dispatch}}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};