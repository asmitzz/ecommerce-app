import {useReducer} from 'react';

const AddressReducer = () => {
    const addressReducer = (state,action) => {

        switch(action.type) {
            case "ADD_ADDRESS":
            return {...state,address:[...state.address,action.payload]}
            case "EDIT_ADDRESS":
            return {...state,selectedAddress:null,address:state.address.map( editaddress => editaddress.id === action.payload.id ? action.payload : editaddress)}
            case "REMOVE_ADDRESS":
            return {...state,address:state.address.filter( address => address.id !== action.payload )}
            case "SELECTED_ADDRESS":
            return {...state,selectedAddress:state.address.find( address => address.id === action.payload )};
            default:
            return state;
        }
    }
    
    const [{address,selectedAddress},dispatch] = useReducer(addressReducer,{address:[],selectedAddress:null});
    return {address,selectedAddress,dispatch}
};

export default AddressReducer;
