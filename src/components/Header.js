import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faPerson} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#03a0df'}}>
      <div className="container">
        <span className="navbar-brand fw-bold text-white">Employee Management System</span>
        <div className="navbar-nav btn-group container">
         <button className='btn text-white' ><a className="nav-link active text-white" href="/add">Add Employee</a></button>
         <button className='btn'><a className="nav-link active text-white" href="/">Get All Employee</a></button>

        </div>
      </div>
    </nav>
    </div>
  );
}

export default Header;

