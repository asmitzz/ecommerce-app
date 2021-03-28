import React, { createContext,useContext } from 'react';
import ProductReducer from '../reducers/ProductReducer';

export const productContext = createContext();

export const ProductContextProvider = ({children}) => {
    
    const { state,dispatch } = ProductReducer();

    const getSortedProducts = (state) => {
        if( state.sortBy === "LOW_TO_HIGH" ) return {...state,products:state.products.sort( (a,b) => a.price - b.price)};
        if( state.sortBy === "HIGH_TO_LOW" ) return {...state,products:state.products.sort( (a,b) => b.price - a.price)};
        return state;
    }

    const getFilteredProducts = (sortedProducts) => {
        return {...sortedProducts, products:sortedProducts.products.filter( p => sortedProducts.includeOutOfStock ? true : p.inStock)
        .filter( p => sortedProducts.fastDelivery ? p.fastDelivery : true )
        .filter( p => sortedProducts.priceRange !== null ? parseInt(p.price) <= parseInt(sortedProducts.priceRange) : true )
        .sort( value => value.inStock ? -1 : 1 )     
    }
    }

    const sortedProducts = getSortedProducts(state);
    const { products,includeOutOfStock,sortBy,fastDelivery } = getFilteredProducts(sortedProducts); 

    return(
        <productContext.Provider value={{ includeOutOfStock,products,sortBy, dispatchProduct:dispatch,fastDelivery }}>
            {children}
        </productContext.Provider>
    );
};

export const useProducts = () => (
    useContext(productContext)
)
