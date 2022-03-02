import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../SignUp/SignUp.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {base_backend_url} from '../../../configuration';

function SignUp() {
    const [details,setDetails] = useState({
      FirstName:"",
      LastName:"",
      Email:"",
      Password:"",
    });
    const [confirmPassword,setConfirmPassword] = useState("`");
    const navigate = useNavigate();
    const registerUser = (e) =>{
      e.preventDefault();
      console.log(details);
      console.log(confirmPassword)
      if(details.Password!==confirmPassword){
            console.log("passwords doesn't match");
      }
      else{
        axios({
          method:'post',
          // url:"http://localhost:4000/register",
          url:`${base_backend_url}/auth/register`,
          data:details,
          headers: {'X-Requested-With': 'XMLHttpRequest'},
        })
        .then((response)=>{
          console.log("frontend data " ,response);
          if(response.data === 0){
            console.log("email already registered")
          }
          else{
            console.log("user succesfully registered");
            navigate("/");
          }
        })
        .catch(()=>{
          console.log("error siging up user")
        })
      }
     
    }
    useEffect(()=>{

    },[details])
  return( 
  <div className='signUp'>
        <div className='signUpOuterDiv'>
        <h1 className='signUpHeading'>Sign Up</h1>
        <form className='syllabus-form' onSubmit={registerUser}  className="signUpFormDiv">
                <input type="text" 
                      required placeholder='First Name' 
                      name="FirstName" className='signUpFormInput' 
                      onChange={(e)=>setDetails( prev => ({...prev,FirstName:e.target.value}))}
                      
                />
                <br/>
                <input type="text" 
                      required placeholder='Last Name' 
                      name="LastName" className='signUpFormInput'
                      onChange={(e)=>setDetails( prev => ({...prev,LastName:e.target.value}))}
                /><br/>
                <input type="email" 
                      required placeholder='Email' 
                      name="Email" className='signUpFormInput'
                      onChange={(e)=>setDetails( prev => ({...prev,Email:e.target.value}))}
                /><br/>
                <input type="password" 
                      required placeholder='Password' 
                      name="Password" className='signUpFormInput'
                      onChange={(e)=>setDetails( prev => ({...prev,Password:e.target.value}))}
                /><br/>
                <input type="password" 
                      required placeholder='Confirm Password' 
                      name="ConfirmPassword" className='signUpFormInput'
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                /><br/>
                <button type='submit' className='signUpButton'>Sign Up </button>
                <p style={{color: "white"}}>Already have an account ?
                    <button  className='signUpButton'>
                    <Link to="/" className='signUpButton'>
                        Log in
                    </Link>
                </button>
                </p>
        </form>
        </div>
  </div>
  )
}

export default SignUp;
