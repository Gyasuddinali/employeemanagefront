import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faPerson} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'navajowhite'}}>
      <div className="container">
        <span className="navbar-brand fw-bold">Employee Management System</span>
        <div className="navbar-nav btn-group container">
         <button className='btn btn-outline-primary' ><a className="nav-link active" href="/add">Add Employee</a></button>
         <button className='btn btn-outline-primary'><a className="nav-link active" href="/">Get All Employee</a></button>

        </div>
      </div>
    </nav>
    </div>
  );
}

export default Header;

