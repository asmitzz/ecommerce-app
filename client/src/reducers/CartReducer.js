import { useReducer } from 'react';

const CartReducer = () => {
    const cartReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_CART":
            return {...state,cart:[...state.cart,{...action.payload,qty:1}]};
            case "REMOVE_FROM_CART":
            return {...state,cart:state.cart.filter( i => i.id !== action.payload )};
            case "ADD_QTY":
            return {...state,cart:state.cart.map( i => i.id === action.payload ? {...i,qty:i.qty + 1} : i )};
            case "REMOVE_QTY":
            return {...state,cart:state.cart.map( i => i.id === action.payload ? {...i,qty:i.qty - 1} : i )};
            case "EMPTY_CART":
            return {cart:[]}
            default:
            return state;
        }
    }

    const [{cart}, dispatch] = useReducer(cartReducer,{cart:[]});

    const getTotalCartValue = () => cart.reduce( (total,i) => parseInt(total) + parseInt(i.price*i.qty) , 0);
    const totalCartValue = getTotalCartValue();

    const getTotalCartItem = () =>  cart.reduce( (total,i) => parseInt(total) + parseInt(i.qty) , 0);
    const totalCartItem = getTotalCartItem();

    return {cart,totalCartValue,totalCartItem,dispatch}
};

export default CartReducer;
