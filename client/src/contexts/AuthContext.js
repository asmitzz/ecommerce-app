import React,{ createContext,useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [isUserloggedIn,setIsUserloggedIn] = useState(false);
    const navigate = useNavigate();

    const loginWithCerediantials = ({email,password,path}) => {
       if(email === "asmit123@gmail.com" && password === "Asmit123"){
           setIsUserloggedIn(true);
           navigate(path);
       }
    }
   
    return (
        <AuthContext.Provider value={{isUserloggedIn,loginWithCerediantials}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);