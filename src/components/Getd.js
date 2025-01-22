

import { useState, useEffect } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBriefcase, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch('https://employeemanage.vercel.app/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  async function deleteEmployee(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    if (isConfirmed) {
    try {

      await fetch(`https://employeemanage.vercel.app/api/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter(emp => emp._id !== id));
      setSelectedEmployee(null);
     
      toast.success("Empoly Data Delete Success!", {
        position: "top-center",
        style: {
          fontSize: '20px',   
          padding: '25px',    
          width: '400px',   
        },
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }
}

  function viewEmployee(employee) {
    setSelectedEmployee(employee);
    setShowDetails(true);
  }

  return (
    <div className="container mx-auto py-6">
        <ToastContainer></ToastContainer>
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>

      {/* Table View */}
      <div className="col-md-8">
      <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
            <tr>
            <th>Profile</th> 
              <th>Name</th>
              <th>Department</th>
              
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                 <td>
                      {employee.image ? (
                        <img
                          //src={`http://localhost:5000/${employee.image}`}  
                          src={employee.image}
                          alt={employee.name}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <span className="fs-4">{employee.name[0]}</span>
                        </div>
                      )}
                    </td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                
                <td>{employee.location}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewEmployee(employee)}
                      className="btn btn-outline-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="btn btn-outline-warning">
                      <a href={`/update/${employee._id}`}>
                      <Pencil className="h-4 w-4" />
                      </a>
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="btn btn-outline-danger"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      {/* Employee Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div className="grid gap-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                  {selectedEmployee.image ? (
                    <img
                      src={selectedEmployee.image}
                      alt={selectedEmployee.name}
                      className="img-fluid rounded-circle"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <span className="text-2xl font-bold text-primary">
                        {selectedEmployee.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedEmployee.name}
                  </h2>
                  <p className="text-muted-foreground">Age: {selectedEmployee.age}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1"><FontAwesomeIcon icon={faBriefcase} className="me-2" />Department</h3>
                    <p>{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />Location</h3>
                    <p>{selectedEmployee.location}</p>
                  </div>
                  <div>
                    
                    <h3 className="font-semibold mb-1"><FontAwesomeIcon icon={faEnvelope} className="me-2" />Email</h3>
                    
                    <p>{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1"><FontAwesomeIcon icon={faPhone} className="me-2" />Mobile</h3>
                    <p>{selectedEmployee.mobile}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-muted-foreground">{selectedEmployee.description}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}













