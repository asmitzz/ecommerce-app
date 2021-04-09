import React,{ createContext,useContext, useReducer, useState } from 'react';
import { login,signup } from '../api/fakeAuthApi';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [isUserloggedIn,setIsUserloggedIn] = useState( JSON.parse(localStorage?.getItem('authToken')) || false );
    
    const userReducer = (state, action) => {
        switch (action.type) {
            case "SIGNUP":
            return [...state,action.payload];
            default:
            return state;
        }
    }
    const [users,dispatch] = useReducer(userReducer,[{email:'asmitshrivastava8@gmail.com', password:'Asmit123'}])

    const loginWithCerediantials = async({email,password}) => {
       const response = await login(email,password,users);
       
       if( response.success ){
           localStorage.setItem('authToken', JSON.stringify(true));
           setIsUserloggedIn(true);
           return response;
       }
       return response;
    }

    async function signUpWithCredentials({email,password}){
        const response = await signup(email,users);
        
        if( response.success ){
           dispatch({type:"SIGNUP",payload:{email,password}});
           return response;
        }
        return response;
    }
   
    return (
        <AuthContext.Provider value={{isUserloggedIn,loginWithCerediantials,signUpWithCredentials}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);