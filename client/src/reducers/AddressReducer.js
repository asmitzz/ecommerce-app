import {useEffect, useReducer} from "react";
import {useAuth} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const AddressReducer = () => {

    const { uid } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        ( async function(){
          try {
            const res = await axios.get("https://shopping-hub-2021.herokuapp.com/api/addresses/"+uid);
            dispatch({ type:"INITIAL_STATE",payload:{address:res?.data?.addresses,selectedAddress:res?.data?.selectedAddress}})
          } catch (error) {
            return dispatch({ type:"INITIAL_STATE",payload:[]})
          }
        } )()
      },[uid] )

      const addressReducer = (state,action) => {

        switch(action.type) {
            case "INITIAL_STATE":
            return action.payload
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
 

    const addAddress = async(address,loader) => {
        loader(true)
        try {
            await axios.post(`https://shopping-hub-2021.herokuapp.com/api/addresses/${uid}`,address);
            dispatch({ type:"ADD_ADDRESS",payload:address});
            loader(false);
            navigate("/address");
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }

    const removeAddress = async(addressID,loader) => {
        loader(true)
        try {
            await axios.delete(`https://shopping-hub-2021.herokuapp.com/api/addresses/${uid}/${addressID}`);
            dispatch({ type:"REMOVE_ADDRESS",payload:addressID})
            loader(false)
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }

    const editAddress = async(address,loader) => {
        try {
            await axios.post(`https://shopping-hub-2021.herokuapp.com/api/addresses/${uid}/${address.addressID}`,address);
            dispatch({ type:"EDIT_ADDRESS",payload:address})
        } catch (error) {
            alert("something went wrong with server");
        }
    }

    const setSelectedAddress = async(addressID,loader) => {
        loader(true)
        try {
            await axios.post(`https://shopping-hub-2021.herokuapp.com/api/addresses/${uid}/${addressID}/setaddress`);
            dispatch({ type:"SELECTED_ADDRESS",payload:addressID})
            loader(false)
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }
    
    return {address,dispatch,selectedAddress,setSelectedAddress,addAddress,removeAddress,editAddress}
};

export default AddressReducer;
