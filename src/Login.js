import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBriefcase, faPhone, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { EyeIcon, Pen, Trash } from 'lucide-react';

export default function Login() {
  const [employees, setEmployees] = useState([]); // State for employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [showCard, setShowCard] = useState(true); // State to control the visibility of the card
  const [loginPrompt, setLoginPrompt] = useState(false); // State to trigger login prompt
  const [username, setUsername] = useState(''); // Store entered username
  const [password, setPassword] = useState(''); // Store entered password
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store the employee to be deleted

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch('https://empolyserver.vercel.app/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  async function deleteEmployee(id) {
    // Show the login prompt when delete is clicked
    setLoginPrompt(true);
    setEmployeeToDelete(id);
  }

  // Handle login validation
  const handleLogin = () => {
    const validUsername = 'gyasu'; 
    const validPassword = '12345';

    if (username === validUsername && password === validPassword) {
     
      confirmDelete();
      setLoginPrompt(false); // Close the login prompt
    } else {
      
      toast.error("Invalid credentials. Please try again.", {
        position: "top-center",
        style: {
          fontSize: '20px',
          padding: '25px',
          width: '400px',
        },
      });
      setLoginPrompt(false); // Close the login prompt
    }
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
      if (isConfirmed) {
        try {
          await fetch(`https://empolyserver.vercel.app/api/employees/${employeeToDelete}`, {
            method: 'DELETE',
          });
          setEmployees(employees.filter(emp => emp._id !== employeeToDelete));
          setSelectedEmployee(null);
          toast.success("Employee Data Deleted Successfully!", {
            position: "top-center",
            style: {
              fontSize: '20px',
              padding: '25px',
              width: '400px',
            },
          });
          setShowCard(false);
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }
    }
  };

  
  const closeCard = () => {
    setShowCard(false);
    setSelectedEmployee(null);
  };

  
  const viewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowCard(true);
  };

  return (
    <div className="container-fluid py-4">
      <ToastContainer />
      <h1 className="mb-4">Employee Management</h1>

      <div className="row">
        
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td><FontAwesomeIcon className="person-icon text-info" icon={faUser} /> {employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.location}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => viewEmployee(employee)} // Use the viewEmployee function to select an employee
                      >
                        View<EyeIcon />
                      </button>
                      <a 
                        href={`/update/${employee._id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit<Pen />
                      </a>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        Delete<Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          {showCard && selectedEmployee && (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="card-title mb-0">Employee Details</h2>
                  <div>
                    <a href={`/update/${selectedEmployee._id}`} className="btn btn-primary btn-sm me-2">Edit</a>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(selectedEmployee._id)}>Delete</button>
                    <button className="btn btn-secondary btn-sm" onClick={closeCard}>Close</button> {/* Close button */}
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    {selectedEmployee.image ? (
                      <img
                        src={selectedEmployee.image}
                        alt={selectedEmployee.name}
                        className="rounded-circle"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                        <span className="fs-4">{selectedEmployee.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-0">{selectedEmployee.name}</h3>
                    <p className="text-muted mb-0">Age: {selectedEmployee.age}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <strong>Email:</strong> {selectedEmployee.email}
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                  <strong>Department:</strong> {selectedEmployee.department}
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <strong>Mobile:</strong> {selectedEmployee.mobile}
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  <strong>Location:</strong> {selectedEmployee.location}
                </div>
                <div className="mt-3">
                  <strong>Description:</strong>
                  <p>{selectedEmployee.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
      {loginPrompt && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login to Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setLoginPrompt(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={handleLogin}>
                  Login and Confirm Deletion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
