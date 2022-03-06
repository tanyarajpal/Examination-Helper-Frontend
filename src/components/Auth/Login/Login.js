import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Login/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {base_backend_url} from '../../../configuration';

function Login() {

    const navigate = useNavigate();
    const [details,setDetails] = useState({ Email:"", Password:""});

    const userLogin = async (e)=>{
      console.log("hi");
      e.preventDefault();
        axios({
              method:'post',
              data:details,
              url:`${base_backend_url}/auth/login`,
              withCredentials:true,
              headers: {
                "Content-Type": "application/json",
               "x-access-token":localStorage.getItem("token")
                },
            })
            .then((res)=>{
              console.log(res.cookie);
              console.log(res.token);
              console.log(res);
                if(res.status===200){
                    localStorage.setItem("token",res.data.token)
                    navigate('/home');
                }
                
             })
             .catch((err)=>{
                  console.log("error logging in",err);
             })
    }
    useEffect(()=>{

        axios({
          method:'get',
          url:`${base_backend_url}/auth/login`,
          withCredentials:true, 
          headers: {
            "Content-Type": "application/json",
            "x-access-token":localStorage.getItem("token")
            },
        }).then((res)=>{
          if(res.status === 200)
          navigate('/home');
        })
        .catch((err)=>{
           console.log("An error occurred :",err,"please enter your credentials to log in." );
        })
    },[])
    useEffect(()=>{
    },[details])

  return( 
          <div className='Login'>
                <div className='LoginOuterDiv'>
                <h1 className='LoginHeading'>Log in</h1>
                <form onSubmit={(e)=> userLogin(e)} className="LoginFormDiv">
                        <input type="email" 
                              required placeholder='Email' 
                              name="Email" className='LoginFormInput'
                              onChange={(e)=>setDetails( prev => ({...prev,Email:e.target.value}))}
                        /><br/>
                        <input type="password" 
                              required placeholder='Password' 
                              name="Password" className='LoginFormInput'
                              onChange={(e)=>setDetails( prev => ({...prev,Password:e.target.value}))}
                        /><br/>
                        <button type='submit' className='LoginButton'>Log in </button>
                        <p style={{color: "white"}}>Don't have an account ?
                          <button className='LoginButton'> 
                              <Link to="/signup" className='LoginButton'>
                                Sign Up
                              </Link>
                          </button>
                        </p>
                </form>
                </div>
          </div>
  )
}

export default Login;
