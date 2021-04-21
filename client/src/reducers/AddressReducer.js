import {useEffect, useReducer} from "react";
import {useAuth} from "../contexts/AuthContext";

import axios from 'axios';

const AddressReducer = () => {

    const { uid } = useAuth();

    useEffect( () => {
        ( async function(){
          try {
            const {data} = await axios.get("http://localhost:5000/api/addresses/"+uid);
            dispatch({ type:"INITIAL_STATE",payload:data.addresses})
          } catch (error) {
            return dispatch({ type:"INITIAL_STATE",payload:[]})
          }
        } )()
      },[uid] )

    const addressReducer = (state,action) => {

        switch(action.type) {
            case "INITIAL_STATE":
            return {address:action.payload,selectedAddress:""}
            case "ADD_ADDRESS":
            return {...state,address:[...state.address,action.payload]}
            case "EDIT_ADDRESS":
            return {...state,selectedAddress:"",address:state.address.map( editaddress => editaddress.addressID === action.payload.addressID ? action.payload : editaddress)}
            case "REMOVE_ADDRESS":
            return {...state,address:state.address.filter( address => address.addressID !== action.payload )}
            case "SELECTED_ADDRESS":
            return {...state,selectedAddress:state.address.find( address => address.addressID === action.payload )};
            default:
            return state;
        }
    }

    const [{address,selectedAddress},dispatch] = useReducer(addressReducer,{address:[],selectedAddress:""});


    const addAddress = async(address) => {
        try {
            await axios.post(`http://localhost:5000/api/addresses/${uid}`,address);
            dispatch({ type:"ADD_ADDRESS",payload:address})
        } catch (error) {
            alert("something went wrong with server");
        }
    }

    const removeAddress = async(addressID) => {
        try {
            await axios.delete(`http://localhost:5000/api/addresses/${uid}/${addressID}`);
            dispatch({ type:"REMOVE_ADDRESS",payload:addressID})
        } catch (error) {
            alert("something went wrong with server");
        }
    }

    const editAddress = async(address) => {
        console.log(address);
        try {
            await axios.post(`http://localhost:5000/api/addresses/${uid}/${address.addressID}`,address);
            dispatch({ type:"EDIT_ADDRESS",payload:address})
        } catch (error) {
            alert("something went wrong with server");
        }
    }
    
    return {address,selectedAddress,addAddress,removeAddress,editAddress}
};

export default AddressReducer;
