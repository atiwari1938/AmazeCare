import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/form.css";

const UpdateDoctor = () => {
  const { id } = useParams();
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3009/api/v1/doctor/getdoctorbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const doctor = response.data;
        setDoctorName(doctor.DoctorName);
        setSpeciality(doctor.Speciality);
        setExperience(doctor.Experience);
        setQualification(doctor.Qualification);
        setDesignation(doctor.Designation);
        setEmail(doctor.Email);
      })
      .catch(error => {
        console.error('Error fetching doctor: ', error);
      });
  }, [id]);

  const handleUpdateDoctor = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3009/api/v1/doctor/updatedoctor/${id}`, {
      DoctorName: doctorName,
      Speciality: speciality,
      Experience: experience,
      Qualification: qualification,
      Designation: designation,
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
        console.error('Error updating doctor: ', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Update Doctor</h2>
      <form onSubmit={handleUpdateDoctor} className="form-content">
        <fieldset>
          <legend>Doctor Information</legend>
          <label>
            Name:
            <input type="text" value={doctorName} onChange={e => setDoctorName(e.target.value)} required />
          </label>
          <label>
            Speciality:
            <input type="text" value={speciality} onChange={e => setSpeciality(e.target.value)} required />
          </label>
          <label>
            Experience:
            <input type="number" value={experience} onChange={e => setExperience(e.target.value)} required />
          </label>
          <label>
            Qualification:
            <input type="text" value={qualification} onChange={e => setQualification(e.target.value)} required />
          </label>
          <label>
            Designation:
            <input type="text" value={designation} onChange={e => setDesignation(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <button type="submit">Update Doctor</button>
          <div className="bottom-button">
        <button onClick={() => navigate('/admindashboard')}>Back to Dashboard</button>
      </div>
        </fieldset>
      </form>
      
    </div>
  );
};

export default UpdateDoctor;
