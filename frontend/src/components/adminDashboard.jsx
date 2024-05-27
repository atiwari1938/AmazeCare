
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3009/api/v1/doctor/getdoctor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setDoctors(response.data.doctors || []);
      })
      .catch(error => {
        console.error('Error fetching doctors: ', error);
      });
  };

  const fetchPatients = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3009/api/v1/patient/getallpatients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPatients(response.data.Patients || []);
      })
      .catch(error => {
        console.error('Error fetching patients: ', error);
      });
  };

  const deleteDoctor = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3009/api/v1/doctor/deletedoctor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        fetchDoctors();
      })
      .catch(error => {
        console.error('Error deleting doctor: ', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="toggle-buttons">
        <button onClick={() => setShowDoctors(!showDoctors)}>
          {showDoctors ? 'Hide Doctors' : 'View Doctors'}
        </button>
        <button onClick={() => setShowPatients(!showPatients)}>
          {showPatients ? 'Hide Patients' : 'View Patients'}
        </button>
      </div>

      {showDoctors && (
        <div>
          <h3>Doctor List</h3>
          <div className="card-container">
            {doctors.map(doctor => (
              <div key={doctor.DoctorID} className="card">
                <h3>{doctor.DoctorName}</h3>
                <p>Speciality: {doctor.Speciality}</p>
                <p>Experience: {doctor.Experience} years</p>
                <p>Qualification: {doctor.Qualification}</p>
                <p>Designation: {doctor.Designation}</p>
                <p>Email: {doctor.Email}</p>
                <button className="delete-button" onClick={() => deleteDoctor(doctor.DoctorID)}>Delete</button>
                <Link to={`/update-doctor/${doctor.DoctorID}`}>
                  <button>Update</button>
                </Link>
              </div>
            ))}
            <div className="add-card">
              <Link to="/add-doctor">
                <button>Add Doctor</button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {showPatients && (
        <div>
          <h3>Patient List</h3>
          <div className="card-container">
            {patients.map(patient => (
              <div key={patient.PatientID} className="card">
                <h3>{patient.PatientName}</h3>
                <p>Age: {patient.Age}</p>
                <p>Gender: {patient.Gender}</p>
                <p>Contact Number: {patient.ContactNumber}</p>
                <p>Email: {patient.Email}</p>
                <Link to={`/update-patient/${patient.PatientID}`}>
                  <button>Update</button>
                </Link>
              </div>
            ))}
            <div className="add-card">
              <Link to="/add-patient">
                <button>Add Patient</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
