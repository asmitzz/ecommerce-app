import { createContext, useContext } from "react";
import AddressReducer from "../reducers/AddressReducer";

export const AddressContext = createContext();

export const AddressContextProvider = ({children}) => {

  const {address,selectedAddress,addAddress,removeAddress,editAddress,dispatch} = AddressReducer()
  
  return(
     <AddressContext.Provider value={{address,addAddress,removeAddress,editAddress,selectedAddress,dispatchAddress:dispatch}}>
       {children}
     </AddressContext.Provider>
   )
}

export const useAddress = () => {
   return useContext(AddressContext)
}


