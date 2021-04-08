import React,{ createContext,useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [isUserloggedIn,setIsUserloggedIn] = useState(false);

    const loginWithCerediantials = ({email,password}) => {
       if(email === "asmit123@gmail.com" && password === "Asmit123"){
           setIsUserloggedIn(true);
           return 200
       }
    }
   
    return (
        <AuthContext.Provider value={{isUserloggedIn,loginWithCerediantials}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);