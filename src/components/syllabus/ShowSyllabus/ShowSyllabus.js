import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../ShowSyllabus/ShowSyllabus.css'
import { useNavigate } from "react-router-dom";
import {base_backend_url} from '../../../configuration';

function ShowSyllabus() {
    const [allSyl,setAllSyl] = useState([]);
    const [semester,setSemester] = useState("");
    const [branch,setBranch] = useState("");
   
    var allSyllabus = [];
    const navigate = useNavigate();
    const renderShowSyllabusPage =async ()=>{
          axios({
            methos:"get",
            url:`${base_backend_url}/syllabus/get-all-syllabus`,
            // withCredentials:true,
          })
          .then(res=>{
                console.log(res.data);
                var n = res.data.length;
                for(var i = 0;i<n;i++){
                    var syllabus = [];
                    syllabus.push(res.data[i].Semester);
                    syllabus.push(res.data[i].Branch);
                    syllabus.push(res.data[i].SubjectCode);
                    syllabus.push(res.data[i].SubjectName);
                    syllabus.push(res.data[i].Description);
                    syllabus.push(res.data[i]._id);
                    allSyllabus.push(syllabus);              
                }
                setAllSyl(allSyllabus);
                console.log("data");
                console.log(allSyllabus);       
          }).catch((err)=>{
                console.log("error getting all syllabus",err)
          })
      }
      useEffect(()=>{
        renderShowSyllabusPage() ;
      },[])
    
    const filterSemester = (e) =>{
        setSemester(e.target.value);
    }
    const filterBranch = (e) =>{
      setBranch(e.target.value);
    }
    return (
        <div className='showSyllabus'>
           <div className='showSyllabusHomeDiv'>
                <FontAwesomeIcon icon={faHome} className='showSyllabusHomeIcon' />
                <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
                <br/>
           </div>
      <div className='showSyllabusOuterDiv'>
        <h1 className='showSyllabusHeading'>SHOW SYLLABUS</h1>
        <div className='showSyllabusSemesterDropdown'>
        <label style={{color: "white",fontWeight:"bold"}} for="semester">SELECT A SEMESTER : </label>
            <select className='formDropdown' name="semester" id="semesters" onChange={filterSemester}>
              <option value="select a semester">select a semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
        </div>
        <br/>
        <div className='showSyllabusBranchDropdown'>
        <label style={{color: "white",fontWeight:"bold"}} for="branch">SELECT A BRANCH   :  </label>
            <select className='formDropdown' name="branch" id="branches" onChange={filterBranch}>
            <option value="select a branch">select a branch</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="ce">CE</option>
              <option value="me">ME</option>
              <option value="it">IT</option>
            </select>
        </div>
      <br/>
      <br/>
        <table className='mainTable'>
        <tr className='tableHeading'>
          <th className='tableHeadinElement'>SEMESTER</th>
          <th className='tableHeadinElement'>BRANCH</th>
          <th className='tableHeadinElement'>SUBJECT CODE</th>
          <th className='tableHeadinElement'>SUBJECT NAME</th>
          <th className='tableHeadinElement'>DESCRIPTION</th>
        </tr>
      {allSyl.filter(data =>{
         return (((data[0] == semester) && (data[1] == branch))  || ( (semester === "") && (branch === "")))
      }).map((items, index) => {
        return (
          <tr className='syllabusList'>
              <td>{items[0]}</td>
              <td>{items[1]}</td>
              <td>{items[2]}</td>
              <td>{items[3]}</td>
              <td>
               <button className='showSyllabusButton'>
                 <Link to={`/syllabus/showSyllabus/${items[5]}`} className='showSyllabusButtonLink'>show</Link>
               </button>
              </td>
          </tr>
          
        );
      })}
      </table>
    </div>
    
    </div>
         
    );
}

export default ShowSyllabus;