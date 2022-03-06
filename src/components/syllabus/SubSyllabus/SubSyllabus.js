import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../SubSyllabus/SubSyllabus.css'
import {base_backend_url} from '../../../configuration';
function SubSyllabus() {
    var currUrl = window.location.pathname;
    var subId = currUrl.substr(23);
    const [subData,setSubData] = useState([]); 
    const [loggedin,setLoggedin] = useState(0);
    const navigate = useNavigate();
    const renderSubSyllabusPage =async ()=>{
          var temp = [];
              axios({
                method:"get",
                url:`${base_backend_url}/syllabus/get-one-syllabus/${subId}`,
                withCredentials:true,
            })
              .then((res)=>{
                  console.log(res.data);
                  temp.push(res.data.Semester);
                  temp.push(res.data.SubjectCode);
                  temp.push(res.data.SubjectName);
                  temp.push(res.data.Description); 
                    setSubData(temp);
                    console.log("subject data",subData); 
                    setLoggedin(1);    
                  
              }).catch((err)=>{
                  console.log("error here tanya", err);
                  setLoggedin(0);
              })
    
    }
    useEffect(()=>{
        renderSubSyllabusPage() ;
    },[])
    
    const deleteSubSyllabus = () =>{       
        axios({
          method:"delete",
          url:`${base_backend_url}/syllabus/delete-syllabus/${subId}`,
         withCredentials:true,
        })
        .then(()=>{
            console.log("item deleted");
            navigate('/syllabus/showSyllabus');
        })
    }
  return (
        <div className='subSyllabus'>
           <div className='subSyllabusHomeDiv'>
                <FontAwesomeIcon icon={faHome} className='subSyllabusHomeIcon' />
                <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
                <br/>
            </div>
            <div className='subSyllabusOuterDiv'>
            {
              !loggedin && (<p>Please Login</p> )
            }
            {
              loggedin && 
            (
              <>
              <p>Semester : {subData[0]}</p>
                  <p >Subject Code : {subData[1]}</p>
                  <p>Subject Name : {subData[2]}</p>
                  <p>Description : {subData[3]}</p>
                  <button className='subSyllabusButton'>
                      <Link to={`/syllabus/showSyllabus/${subId}/edit`} className='subSyllabusButtonLink'>Edit</Link>
                  </button>
                  <button onClick={deleteSubSyllabus} className='subSyllabusButton'>Delete</button>
              </>
            )
            }
            </div>

         
            
        </div>
    );
}

export default SubSyllabus;
