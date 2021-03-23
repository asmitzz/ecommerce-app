import React, { createContext,useReducer } from 'react';
import { products } from '../productsDb';

export const productContext = createContext();

export const ProductContextProvider = ({children}) => {
    
    const productsReducer = (state,action) => {
        switch(action.type){
            case "ADDTOWISHLIST":
            return { ...state,products:state.products.map( i => i.id === action.id ? {...i,isWishlist:true} : i ) }
            case "REMOVEFROMWISHLIST":
            return { ...state,products:state.products.map( i => i.id === action.id ? {...i,isWishlist:false} : i ) }
            default:
            return state;
        }
    }

    const [state,dispatch] = useReducer(productsReducer,{products});

    return(
        <productContext.Provider value={{ products:state.products, dispatchProducts:dispatch }}>
            {children}
        </productContext.Provider>
    );
};
