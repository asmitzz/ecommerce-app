import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [state,setState] = useState({email:"",password:""});
    const [errors,setErrors] = useState({email:"",password:""});

    const {loginWithCerediantials} = useAuth();
    const navigate = useNavigate();
    const path = useLocation().state;

    const handleChange = (e) => {
       const {value,name} = e.target;
       setState( state => ({...state,[name]:value}) )
    }

    const formValidate = (state) => {
       let email,password;

       if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
         email="Please enter a valid email address"
       }

       if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
       }

       setErrors({email,password})

       if(!email && !password){
         return true;
       }
    }

    const handleSubmit = async(e) => {
       e.preventDefault();

       if(formValidate(state)){
          try {
            const {status,message} = await loginWithCerediantials(state);
            
             if( status === 200 ){
              console.log(message);
              navigate(path === null ? "/" : path.from)
             }
          } catch (error) {
             if(error.status === 401){
               setErrors(state => ({...state,password:error.message}))
             }
             else if(error.status === 404){
               setErrors(state => ({...state,email:error.message}))
             }
          }
       }
    }
  
    return (
      <div className="login__container">

        <form onSubmit={handleSubmit}>
            <h1 className="form__heading">LOGIN</h1>
            <div className="form__group">
              <label className="form__label" htmlFor="email">Email : </label>
              <div>
                <input className="form__control" value={state.email} onChange={handleChange} type="email" name="email"/>
                <span className="invalid-feedback">{errors.email}</span>
              </div>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">Password : </label>
              <div>
                <input className="form__control" value={state.password} onChange={handleChange} type="password" name="password"/>
                <span className="invalid-feedback">{errors.password}</span>
              </div>
            </div>

            <input type="submit" className="secondary-btn" value="LOGIN"/>
        </form>
        <br/>
        <small>Don't have an account? <Link to="/signup" className="signup__link">SIGN UP</Link></small>
      </div>

    );
};

export default Login;
