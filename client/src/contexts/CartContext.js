import React,{ createContext,useContext } from 'react';
import CartReducer from '../reducers/CartReducer';
import { useProducts } from "../contexts/ProductContext";

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const { cart,dispatch,addToCart } = CartReducer();
    const { products } = useProducts();

    const cartItems = cart.map( item => ( {...products.find( i => i._id === item.productID ),...item} ))

    const getTotalCartValue = () => cartItems.reduce( (total,i) => parseInt(total) + parseInt(i.price*i.quantity) , 0);
    const totalCartValue = getTotalCartValue();

    const getTotalCartItem = () =>  cartItems.reduce( (total,i) => parseInt(total) + parseInt(i.quantity) , 0);
    const totalCartItem = getTotalCartItem();
    return(
        <cartContext.Provider value={{cart,cartItems,dispatchCart:dispatch,totalCartValue,totalCartItem,addToCart}}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};