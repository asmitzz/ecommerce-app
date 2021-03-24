import React, { createContext,useReducer,useContext } from 'react';
import { productsDb } from '../productsDb';

export const productContext = createContext();

export const ProductContextProvider = ({children}) => {
    
    const productsReducer = (state,action) => {
        switch(action.type){
            case "SORT":
            return {...state,sortBy:action.payload};
            case "INCLUDE_OUT_STOCK":
            return {...state,includeOutOfStock:!state.includeOutOfStock};
            case "FAST_DELIVERY":
            return {...state,fastDelivery:!state.fastDelivery};
            case "ADDTOWISHLIST":
            return { ...state,products:state.products.map( i => i.id === action.id ? {...i,isWishlist:true} : i ) }
            case "REMOVEFROMWISHLIST":
            return { ...state,products:state.products.map( i => i.id === action.id ? {...i,isWishlist:false} : i ) }
            default:
            return state;
        }
    }

    const [state,dispatch] = useReducer(productsReducer,{products:productsDb,sortBy:null,includeOutOfStock:true,fastDelivery:false});

    const getSortedProducts = (state) => {
        if( state.sortBy === "LOW_TO_HIGH" ) return {...state,products:state.products.sort( (a,b) => a.price - b.price)};
        if( state.sortBy === "HIGH_TO_LOW" ) return {...state,products:state.products.sort( (a,b) => b.price - a.price)};
        return state;
    }

    const getFilteredProducts = (sortedProducts) => {
        return {...sortedProducts, products:sortedProducts.products.filter( p => sortedProducts.includeOutOfStock ? true : p.inStock)
        .filter( p => sortedProducts.fastDelivery ? p.fastDelivery : true )}
    }

    const sortedProducts = getSortedProducts(state);
    const {includeOutOfStock,products,sortBy,fastDelivery} = getFilteredProducts(sortedProducts); 

    const wishlist = state.products.filter( i => i.isWishlist);
    console.log(wishlist);

    return(
        <productContext.Provider value={{ includeOutOfStock,products,sortBy, dispatch,wishlist,fastDelivery }}>
            {children}
        </productContext.Provider>
    );
};

export const useProducts = () => (
    useContext(productContext)
)
