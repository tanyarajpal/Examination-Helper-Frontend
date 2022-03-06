import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../AddSyllabus/AddSyllabus.css'
import { useNavigate } from "react-router-dom";
import {base_backend_url} from '../../../configuration';
function AddSyllabus() {
  const navigate = useNavigate();
  const [details,setDetails] = useState({
        Semester:0,
        Branch:"",
        SubjectCode:"",
        SubjectName:"",
        Description:""
  })
    const addSyllabus = (e)=>{
        e.preventDefault();
        console.log(details);
        axios({
          method:"post",
          data:details,
          url : `${base_backend_url}/syllabus/create-syllabus`,
          withCredentials:true,
          headers: {
            "Content-Type": "application/json",
            "x-access-token":localStorage.getItem("token")
            },
        })
          .then((res)=>{
              if(res.status === 200){
                  navigate('/syllabus/showSyllabus');
              }
            //   else{
            //       navigate('/')
            //   }
          })
            .catch((err)=>{
                console.log("error adding syllabus",err);
                navigate('/')
            })
    }
    const updatePostData = (e)=>{
         const {name,value} = e.target;
          setDetails({...details,[name]:value});
    }
    return (
       
        <div className='addSyllabus'>
            <div className='addSyllabusHomeDiv'>
                <FontAwesomeIcon icon={faHome} className='addSyllabusHomeIcon' />
                <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
                <br/>
            </div>
            <div className='addSyllabusOuterDiv'>
            <h1 className='addSyllabusHeading'>ADD SYLLABUS</h1>
            <form className='syllabus-form' onSubmit={(e)=>addSyllabus(e)} className="addSyllabusFormDiv">
                <input type="number" min="1" max="8" required placeholder='semester' name="Semester" onChange={(e)=> updatePostData(e)} className='addSyllabusFormInput'/><br/>
                <input list="branches" required placeholder='select branch' name="Branch" onChange={(e)=> updatePostData(e)} className='addSyllabusFormInput'/>
                        <datalist id="branches">
                            <option value="cse"/>
                            <option value="ece"/>
                            <option value="ce"/>
                            <option value="me"/>
                            <option value="it"/>
                        </datalist>
                <br/>
                <input type="text" required placeholder='subject code' name="SubjectCode" onChange={(e)=> updatePostData(e)} className='addSyllabusFormInput'/><br/>
                <input type="text" required placeholder='subject name' name="SubjectName" onChange={(e)=> updatePostData(e)} className='addSyllabusFormInput'/><br/>
                <input type="text" required placeholder='description' name="Description"  onChange={(e)=> updatePostData(e)} className='addSyllabusFormInput'/><br/>
                <button type='submit' className='addSyllabusButton'>Add syllabus </button>
            </form>
            </div>
        </div>
    )
}

export default AddSyllabus;
