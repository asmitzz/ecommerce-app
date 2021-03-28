import { createContext,useReducer, useContext } from "react";

export const AddressContext = createContext();

export const AddressContextProvider = ({children}) => {

  const addressReducer = (state,action) => {

      switch(action.type) {
          case "ADD_ADDRESS":
          return {...state,address:[...state.address,action.payload]}
          case "EDIT_ADDRESS":
          return {...state,address:state.address.map( editaddress => editaddress.id === action.payload.id ? action.payload : editaddress)}
          default:
          return state;
      }
  }
  
  const [{address},dispatch] = useReducer(addressReducer,{address:[]});
  
  return(
     <AddressContext.Provider value={{address,dispatchAddress:dispatch}}>
       {children}
     </AddressContext.Provider>
   )
}

export const useAddress = () => {
   return useContext(AddressContext)
}


