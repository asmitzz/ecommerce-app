import { createContext,useReducer, useContext } from "react";

export const AddressContext = createContext();

export const AddressContextProvider = ({children}) => {

  const addressReducer = (state,action) => {

      switch(action.type) {
          case "ADD_ADDRESS":
          return {...state,address:[...state.address,action.payload]}
          case "EDIT_ADDRESS":
          return {...state,address:state.address.map( editaddress => editaddress.id === action.payload.id ? action.payload : editaddress)}
          case "SELECTED_ADDRESS":
          return {...state,selectedAddress:state.address.find( address => address.id === action.payload )};
          default:
          return state;
      }
  }
  
  const [{address,selectedAddress},dispatch] = useReducer(addressReducer,{address:[],selectedAddress:null});
  
  return(
     <AddressContext.Provider value={{address,selectedAddress,dispatchAddress:dispatch}}>
       {children}
     </AddressContext.Provider>
   )
}

export const useAddress = () => {
   return useContext(AddressContext)
}


