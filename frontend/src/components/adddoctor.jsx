import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/form.css";

const AddDoctor = () => {
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [passwordd, setPasswordd] = useState('');
  const [userRole, setUserRole] = useState('Doctor');
  
  const navigate = useNavigate();

  const handleAddDoctor = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3009/api/v1/user/doctorregister', {
      DoctorName: doctorName,
      Speciality: speciality,
      Experience: experience,
      Qualification: qualification,
      Designation: designation,
      Email: email,
      Passwordd: passwordd,
      UserRole: userRole
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert("Doctor added Sucessfully")
        setTimeout(() => {
          navigate('/admindashboard');
        }, 2000);
      })
      .catch(error => {
        console.error('Error adding doctor: ', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleAddDoctor} className="form-content">
        <fieldset>
          <legend>Doctor Information</legend>
          <label>
            Name:
            <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
          </label>
          <label>
            Speciality:
            <input type="text" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
          </label>
          <label>
            Experience:
            <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </label>
          <label>
            Qualification:
            <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
          </label>
          <label>
            Designation:
            <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={passwordd} onChange={(e) => setPasswordd(e.target.value)} required />
          </label>
          <label>
            User Role:
            <input type="text" value={userRole} readOnly />
          </label>
          <button type="submit">Add Doctor</button>
          <div className="button-container">
          <button type="button" className="back-button" onClick={() => navigate('/admindashboard')}>Back to Dashboard</button>
          </div>
        </fieldset>
      </form>
      
    </div>
  );
};

export default AddDoctor;
