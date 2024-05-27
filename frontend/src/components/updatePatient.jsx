import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/form.css"; // Ensure you have appropriate styles in this file

const UpdatePatient = () => {
  const { id } = useParams();
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3009/api/v1/patient/getpatientbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const patient = response.data;
        setPatientName(patient.PatientName);
        setAge(patient.Age);
        setGender(patient.Gender);
        setContactNumber(patient.ContactNumber);
        setEmail(patient.Email);
      })
      .catch(error => {
        console.error('Error fetching patient: ', error);
      });
  }, [id]);

  const handleUpdatePatient = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3009/api/v1/patient/updatepatient/${id}`, {
      PatientName: patientName,
      Age: age,
      Gender: gender,
      ContactNumber: contactNumber,
      Email: email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert("Updated Successfully");
        setTimeout(() => {
          navigate('/admindashboard');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating patient: ', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Update Patient</h2>
      <form onSubmit={handleUpdatePatient} className="form-content">
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
          <button type="submit">Update Patient</button>
          <div className="button-container">
          <button type="button" className="back-button" onClick={() => navigate('/admindashboard')}>Back to Dashboard</button>
          </div>
        </fieldset>
      </form>
      
    </div>
  );
};

export default UpdatePatient;
