import React,{ createContext,useContext, useReducer } from 'react';
import { login,signup } from '../api/fakeAuthApi';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const userReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
            return {...state,user:{ login : true, data : action.payload}}
            case "SIGNUP":
            return {...state,users:[...state.users,action.payload]};
            default:
            return state;
        }
    }
    
    const [{users,user},dispatch] = useReducer(userReducer,{ users:[{name:"Asmit",email:'asmitshrivastava8@gmail.com',password:'Asmit123'}],user:JSON.parse(localStorage?.getItem('authToken')) || { login:false , data:null }})

    const loginWithCerediantials = async({email,password}) => {
       const response = await login(email,password,users);
       
       if( response.success ){
           localStorage.setItem('authToken', JSON.stringify({login:true,data:{name:response.user.name,email:response.user.email}}))
           dispatch({type:"LOGIN",payload:{name:response.user.name,email:response.user.email}});
           return response;
       }
       return response;
    }

    async function signUpWithCredentials({name,email,password}){
        const response = await signup(email,users);
        
        if( response.success ){
           dispatch({type:"SIGNUP",payload:{name,email,password}});
           return response;
        }
        return response;
    }
  
    return (
        <AuthContext.Provider value={{isUserloggedIn:user.login,userDetails:user.data,loginWithCerediantials,signUpWithCredentials}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);