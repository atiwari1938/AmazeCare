import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/form.css";

const AddPatient = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Patient');
  const navigate = useNavigate();

  const handleAddPatient = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post('http://localhost:3009/api/v1/user/patientregister', {
          PatientName: patientName,
          Age: age,
          Gender: gender,
          ContactNumber: contactNumber,
          Email: email,
          Passwordd: password,
          UserRole: 'Patient',
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert("patient added successfully");
      setTimeout(() => {
        navigate('/admindashboard');
      }, 2000);
    } catch (error) {
      console.error('Error adding patient: ', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Patient</h2>
      <form onSubmit={handleAddPatient} className="form-content">
        <fieldset>
          <legend>Patient Information</legend>
          <label>
            Patient Name:
            <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" required />
          </label>
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Contact Number:
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </label>
          <label>
            User Role:
            <input type="text" value={userRole} readOnly />
          </label>
          <button type="submit">Add Patient</button>
          <div className="button-container">
          <button type="button" className="back-button" onClick={() => navigate('/admindashboard')}>Back to Dashboard</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddPatient;
