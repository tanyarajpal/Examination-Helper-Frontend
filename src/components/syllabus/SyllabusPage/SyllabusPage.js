import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '../SyllabusPage/SyllabusPage.css'

function SyllabusPage() {

  return( 
          <div className='syllabusPage'> 
              <div className='syllabusPageHomeDiv'>
                <FontAwesomeIcon icon={faHome} className='syllabusPageHomeIcon' />
                <h1><Link to="/home" className='homeHeading'>HOME</Link></h1>
                <br/>
              </div>
              <div className='syllabusOuterDiv'>
                <h1 className='syllabusHeading'>SYLLABUS PAGE</h1>
                <h3 className='syllabusLabel'>Click here to add a syllabus</h3>
                <div className='syllabusButton' >
                <Link to="/syllabus/addSyllabus" className='syllabusPageLink'>Add Syllabus</Link>
                </div>
                <br/>
                <h3 className='syllabusLabel'>Click here to see all syllabuses</h3>
                <div className='syllabusButton' >
                <Link to="/syllabus/showSyllabus" className='syllabusPageLink'>Show Syllabus</Link>
                </div>
                <br/>
              </div>
            </div>
  )
}

export default SyllabusPage;
