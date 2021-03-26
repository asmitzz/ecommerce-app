import { useReducer } from 'react';

const CartReducer = () => {
    const cartReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_CART":
            return {...state,cart:[...state.cart,action.payload]};
            default:
            return state;
        }
    }

    const [{cart}, dispatch] = useReducer(cartReducer,{cart:[]})
    
    return {cart,dispatch}
};

export default CartReducer;
