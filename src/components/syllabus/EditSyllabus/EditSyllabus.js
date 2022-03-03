import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../EditSyllabus/EditSyllabus.css'
import {base_backend_url} from '../../../configuration';
function EditSyllabus() {
    var currUrl = window.location.pathname;
    var subId = currUrl.substr(23);
    var cnt = 0;
    for(var i = 0;i<subId.length ;i++){
        if(subId[i]==='/') break;
        cnt++;
    }
    subId = subId.substr(0,cnt);
    const navigate = useNavigate();
    const [updatedData,setUpdatedData] = useState({
        Semester:null,
        Branch:"",
        SubjectCode:"",
        SubjectName:"",
        Description:""
    })
    const getSyllabus = async ()=>{
      
        axios({
            method:"get",
            url:`${base_backend_url}/syllabus/get-one-syllabus/${subId}`,
            //withCredentials:true,
        })
         .then((res)=>{
            console.log("response",res.data)
            setUpdatedData(res.data);
         })
           .catch((err)=>{
                console.log('error getting previous syllabus : ',err);
            })
    }
    const updateSyllabus = async (e)=>{
        e.preventDefault();
        console.log("inside update syllabus")
         await axios({
              method:"post",
              data:updatedData,
              url:`${base_backend_url}/syllabus/update-syllabus/${subId}`,
              withCredentials:true,
            })
          .then((res)=>{
              console.log(res);
              console.log(res.status,res.data.message);
              navigate(-1);
          }).catch((err)=>{
              console.log("error updating syllabus",err);
          })
    }
    useEffect(()=>{
        getSyllabus();
    },[])

    const updateSyl = (e) =>{
            e.preventDefault();
            setUpdatedData({...updatedData,[e.target.name]:e.target.value});
    }
  return( <div className='editSyllabus'>
             <div className='editSyllabusHomeDiv'>
                <FontAwesomeIcon icon={faHome} className='editSyllabusHomeIcon' />
                <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
                <br/>
            </div>
            <div className='editSyllabusOuterDiv'>
                <h1 className='editSyllabusHeading'>UPDATE SYLLABUS</h1>
                <form className='syllabus-form' onSubmit={(e)=>updateSyllabus(e)} className="editSyllabusFormDiv">
                    <input type="number" min="1" max="8" required placeholder='semester' name="Semester" className='addSyllabusFormInput' value={updatedData.Semester} onChange={updateSyl} className='editSyllabusFormInput'/><br/>
                    <input list="branches" required placeholder='select branch' name="Branch" value={updatedData.Branch} onChange={updateSyl} className='editSyllabusFormInput'/>
                        <datalist id="branches">
                            <option value="cse"/>
                            <option value="ece"/>
                            <option value="ce"/>
                            <option value="me"/>
                            <option value="it"/>
                        </datalist>
                    <br/>
                    <input type="text" required placeholder='subject code' name="SubjectCode" value={updatedData.SubjectCode} onChange={updateSyl} className='editSyllabusFormInput'/> <br/>
                    <input type="text" required placeholder='subject name' name="SubjectName" value={updatedData.SubjectName} onChange={updateSyl} className='editSyllabusFormInput'/><br/>
                    <input type="text" required placeholder='description' name="Description" value={updatedData.Description} onChange={updateSyl} className='editSyllabusFormInput' /><br/>
                    <button type='submit' className='editSyllabusButton'>update syllabus </button>
                </form>
            </div>
          
  </div>);
}

export default EditSyllabus;
