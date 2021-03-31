import { createContext, useContext } from "react";
import AddressReducer from "../reducers/AddressReducer";

export const AddressContext = createContext();

export const AddressContextProvider = ({children}) => {

  const {address,selectedAddress,dispatch} = AddressReducer()
  
  return(
     <AddressContext.Provider value={{address,selectedAddress,dispatchAddress:dispatch}}>
       {children}
     </AddressContext.Provider>
   )
}

export const useAddress = () => {
   return useContext(AddressContext)
}


