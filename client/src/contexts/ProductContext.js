import React, { createContext,useContext } from 'react';
import ProductReducer from '../reducers/ProductReducer';
import { products } from "../productsDb";

export const productContext = createContext();

export const ProductContextProvider = ({children}) => {
    
    const { state,dispatch } = ProductReducer();

    const { sortBy,includeOutOfStock,fastDelivery,priceRange} = state;

    const getSortedProducts = (products) => {
        if( sortBy === "LOW_TO_HIGH" ) return products.sort( (a,b) => a.price - b.price);
        if( sortBy === "HIGH_TO_LOW" ) return products.sort( (a,b) => b.price - a.price);
        return products.sort( value => value.inStock ? -1 : 1 );
    }

    const getFilteredProducts = (sortedProducts) => {
        return sortedProducts.filter( p => includeOutOfStock ? true : p.inStock)
        .filter( p => fastDelivery ? p.fastDelivery : true )
        .filter( p => priceRange !== null ? parseInt(p.price) <= parseInt(priceRange) : true )     
    }

    const sortedProducts = getSortedProducts(products);
    const FilteredProducts = getFilteredProducts(sortedProducts); 

    return(
        <productContext.Provider value={{ includeOutOfStock,products:FilteredProducts,sortBy, dispatchProduct:dispatch,fastDelivery }}>
            {children}
        </productContext.Provider>
    );
};

export const useProducts = () => (
    useContext(productContext)
)
