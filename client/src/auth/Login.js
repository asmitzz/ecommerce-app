import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

    const [state,setState] = useState({email:"",password:""});
    const [errors,setErrors] = useState({email:"",password:""});

    const {loginWithCerediantials} = useAuth();
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

       if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
       }

       setErrors({email,password})

       if(!email && !password){
         return true;
       }
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       if(formValidate(state)){
          loginWithCerediantials({...state,path:path === null ? "/" : path.from})
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
      </div>

    );
};

export default Login;
