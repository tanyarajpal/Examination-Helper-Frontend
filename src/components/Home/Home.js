import React from 'react';
import { Link } from 'react-router-dom'
import '../Home/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


function Home() {
  return (
    <div className='home' >
      <div className='homeDiv'>
        <FontAwesomeIcon icon={faHome} className='homeIcon' />
        <h1><Link to="/home" className='homeButtonLink'>HOME</Link></h1>
        <br/>
      </div>
      <div className="outerDiv">
        <h3 className='homeLabel'>Click here to go to Syllabus Page</h3>
        <div className='homeButton'>
            <Link to="/syllabus" className='homeButtonLink'>Syllabus</Link>
        </div>
          <br/>
          <h3 className='homeLabel'>Click here to go to Timetable Page</h3>
        <div className='homeButton' >
          <Link to="/timetable" className='homeButtonLink' >Time Table</Link>
        </div>
          <br/>
      </div>
    </div>
  )
}

export default Home;
