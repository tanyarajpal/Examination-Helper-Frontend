import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../TimetablePage/TimetablePage.css'
import { useNavigate } from "react-router-dom";
import {base_backend_url} from '../../../configuration';

function TimetablePage() {
    const navigate = useNavigate();
    const [data,setData] = useState({
        Semester:null,
        Branch:"",
        ExaminationName:"",
    });
    const [newSub,setNewSub] = useState({
        SubjectCode:"",
        SubjectName:"",
        Date:"",
        Time:""
    })
   
    const [fetchedData ,setFetchedData]= useState([]);
   
    const  showTimetable = async (e)=>{
          e.preventDefault();
        await axios({
            method: "post",
            data: data,
            url: `${base_backend_url}/timetable/get-timetable`,
            withCredentials:true,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":localStorage.getItem("token")
              },
          })
          .then((response)=>{
                // console.log(response.data.data);
                setFetchedData(response.data.data);
          })
           .catch(function (err) {
              navigate('/');
              console.log("error fetching data from backend ",err);
            });
    }

    const deleteSubjectSchedule = (e,id,outerId)=>{
       e.preventDefault();
      axios({
         method:"delete",
         url:`${base_backend_url}/timetable/delete-timetable/${outerId}/${id}`,
         withCredentials:true,
         headers: {
          "Content-Type": "application/json",
          "x-access-token":localStorage.getItem("token"),
          // "Access-Control-Allow-Origin": "*"
          },
      })
       .then((res)=>{
            const temp = [];
            temp.push(res.data.data);
            setFetchedData(temp);
       })
       .catch((err)=>{
           console.log("error deleting subject from the timetable",err);
       })
    }

    const addSujectAndTime = async(e)=>{
        e.preventDefault();
        var obj ={};
        const val = new Promise (function(resolve,reject)
        {
                obj = {
                  Semester:data.Semester,
                  Branch:data.Branch,
                  ExaminationName:data.ExaminationName,
                  TimeTable:newSub
            }
          if(Date!=="") resolve(true)
        }
       )
       val.then((bool)=>{
            axios({
                method: "post",
                data: obj,
                url: `${base_backend_url}/timetable/add-timetable`,
                withCredentials:true,
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token":localStorage.getItem("token")
                  },
              })
              .then((response)=>{

                    const temp = [];
                    temp.push(response.data.data);
                   setFetchedData(temp);
                   console.log("added")
              })
               .catch(function (err) {
                  console.log("error fetching data from backend ",err);
                });
            
       })
    }

    const updateData = (e) =>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value});
    }

    const setAddNewData = (e) =>{
        e.preventDefault();
        setNewSub({...newSub,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
      // console.log(data);
    },[data])
    useEffect(()=>{
      // console.log(newSub);
    },[newSub])

  return(
    <div className='timetable'>
    <div className='timetableHomeDiv'>
        <FontAwesomeIcon icon={faHome} className='timetableHomeIcon' />
        <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
        <br/>
    </div>
    <div className='timetableOuterDiv'>
    <h1 className='timetableHeading'>Timetable</h1>
    <form  onSubmit={showTimetable}  className="timetableFormDiv">
        <input type="number" min="1" max="8" required placeholder='semester' name="Semester" className='timetableFormInput' onChange={updateData}/><br/>
        <input list="branches" required placeholder='select branch' name="Branch" className='timetableFormInput' onChange={updateData}/>
                <datalist id="branches">
                    <option value="cse"/>
                    <option value="ece"/>
                    <option value="ce"/>
                    <option value="me"/>
                    <option value="it"/>
                </datalist>
        <br/>
        <input type="text" required placeholder='Examination Name' name="ExaminationName" className='timetableFormInput' onChange={updateData}/><br/>
        <button type='submit' className='timetableButton' >Show Timetable </button>
    </form>
    <div >
    <div>
    <table className='mainTable'>
        <tr className='tableHeading'>
          <th className='tableHeadinElement'>SubjectCode</th>
          <th className='tableHeadinElement'>Subject Name</th>
          <th className='tableHeadinElement'>Date</th>
          <th className='tableHeadinElement'>Time</th>
        </tr>
        {
            fetchedData.map(({_id:outerId,TimeTable})=>{
              return (
                 <>  
                    {
                        TimeTable.map(({_id,SubjectCode,SubjectName,Date,Time})=>{
                            return(
                                <tr className='syllabusList' >
                                   <td> {SubjectCode}</td>
                                    <td>{SubjectName}</td>
                                    <td>{Date}</td>
                                    <td>{Time}</td>
                                    {/* <td><button>Edit</button></td> */}
                                    {/* <td><button onClick={(e) => deleteSubjectSchedule(e, _id,outerId)} className="deleteTimetableButton">Delete</button></td> */}
                                </tr>
                            )
                        })
                    }
                 </>
              )
            })
        }
        </table>
    </div>
   
    </div>
    </div>
    <form  onSubmit={addSujectAndTime}  className="addTimetableFormDiv">
            <input type="text" required placeholder='Subject Code' name="SubjectCode" className='addTimetableFormInput' onChange={setAddNewData}/>
            <input list="branches" required placeholder='Subject Name' name="SubjectName" className='addTimetableFormInput' onChange={setAddNewData}/>
            <input type="text" required placeholder='Date of Exam' name="Date" className='addTimetableFormInput' onChange={setAddNewData}/>
            <input type="text" required placeholder='Time of Exam' name="Time" className='addTimetableFormInput' onChange={setAddNewData}/><br/>
            <button type='submit' className='timetableButton' >Add a new subject</button>
        </form>
</div>
  );
}

export default TimetablePage;
