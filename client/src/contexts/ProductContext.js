import React, { createContext,useReducer,useContext } from 'react';
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

    const wishlist = state.products.filter( i => i.isWishlist);

    return(
        <productContext.Provider value={{ products:state.products, dispatch,wishlist }}>
            {children}
        </productContext.Provider>
    );
};

export const useProducts = () => (
    useContext(productContext)
)
