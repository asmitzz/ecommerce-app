import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../utils/Spinner';
import SuccessToast from '../utils/SuccessToast';

const SignUp = () => {
    const [state,setState] = useState({email:"",password:""});
    const [errors,setErrors] = useState({email:"",password:""});
    const [spinner,setSpinner] = useState(false);
    const [toast,setToast] = useState("");

    const {signUpWithCredentials} = useAuth();

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
         setSpinner(true)
          try {
            const {status,message} = await signUpWithCredentials(state);
            if(status === 200){
              setToast(message);

              setTimeout( () => {
                setToast("");
              },2000) 

              setState({email:"",password:""})
            }
            setSpinner(false)
          } catch (error) {
             if(error.status === 409){
               setErrors( state => ({...state,email:"Email address already exists"}) )
             }
            setSpinner(false)
          }
       }
    }

    return (
      <div className="login__container">
        <Spinner show={spinner}/>
        <SuccessToast show={toast} background="#181818" color="#dab600"/>

      <form onSubmit={handleSubmit}>
          <h1 className="form__heading">SIGN UP</h1>
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

          <input type="submit" className="secondary-btn" value="SIGNUP"/>
      </form>
      <br/>
      <small>Already have an account? <Link to="/login" className="signup__link">LOGIN</Link></small>
    </div>
    );
};

export default SignUp;
