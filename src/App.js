import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router';
import { Link } from 'react-router-dom';
import AddSyllabus from './components/syllabus/AddSyllabus/AddSyllabus';
import ShowSyllabus from './components/syllabus/ShowSyllabus/ShowSyllabus';
import SyllabusPage from './components/syllabus/SyllabusPage/SyllabusPage';
import SubSyllabus from './components/syllabus/SubSyllabus/SubSyllabus';
import EditSyllabus from './components/syllabus/EditSyllabus/EditSyllabus';
import TimetablePage from './components/Timetable/TimetablePage/TimetablePage';
import Login from './components/Auth/Login/Login';
import SignUp from './components/Auth/SignUp/SignUp';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {base_backend_url} from './configuration'
function App() {
  const navigate = useNavigate();
  const userLogout = async ()=>{
    await axios({
      method:'get',
      // url:"http://localhost:4000/logout",
      url:`${base_backend_url}/auth/logout`,
      withCredentials:true,
      headers: {
        "Content-Type": "application/json",
        "x-access-token":localStorage.getItem("token")
        },
    }).then((response)=>{
      console.log("user logged out successfully",response);
       navigate('/');
    }).catch((err)=>{
      console.log("error logging out");
    })
  }
  return (
    <div className="App">
    {/* <Home/> */}
          <h1><button onClick={userLogout} className='timetableButton'>LOG OUT</button></h1>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/home" element={< Home/>} />
            <Route exact path='/syllabus' element={< SyllabusPage/>} />
            <Route exact path="/syllabus/addSyllabus" element={< AddSyllabus/>} />
            <Route exact path="/syllabus/showSyllabus" element={< ShowSyllabus/>} />
            <Route exact path="/syllabus/showSyllabus/:subId" element={< SubSyllabus/>} />
            <Route exact path="/syllabus/showSyllabus/:subId/edit" element={< EditSyllabus/>} />
            <Route exact path="/timetable" element={< TimetablePage/>} />
        </Routes>
    </div> 
  );
}

export default App;
