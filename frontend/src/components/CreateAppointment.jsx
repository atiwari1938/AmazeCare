import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/appoint.css"

function CreateAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorID } = location.state || {};
  const [AppointmentDate, setAppointmentDate] = useState('');
  const [Symptoms, setSymptoms] = useState('');
  const [AppointmentStatus, setAppointmentStatus] = useState('pending');
  const [PatientID, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    const fetchPatientAndDoctorInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is not available');
        }

        const decodedToken = jwtDecode(token);
        setPatientId(decodedToken.patientId);

        // Fetch patient info
        const patientResponse = await axios.get('http://localhost:3009/api/v1/patient/patientinfo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPatientName(patientResponse.data.patient.PatientName);

        // Fetch doctor info
        const doctorResponse = await axios.get(`http://localhost:3009/api/v1/doctor/getdoctorbyid/${doctorID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDoctorName(doctorResponse.data.doctor.DoctorName);
      } catch (error) {
        console.error('Error fetching patient and doctor info:', error.message);
      }
    };

    fetchPatientAndDoctorInfo();
  }, [doctorID]);

  // Function to schedule appointment
  const handleScheduleAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is not available');
        return;
      }

      if (!doctorID || !PatientID || !AppointmentDate || !Symptoms) {
        console.error('Doctor ID, Patient ID, Appointment Date, or Symptoms is not available');
        return;
      }

      const response = await axios.post(
        'http://localhost:3009/api/v1/appointment/createappointment',
        {
          DoctorID: doctorID,
          PatientID,
          AppointmentDate,
          Symptoms,
          AppointmentStatus,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Appointment scheduled successfully');
      } else {
        console.error('Error scheduling appointment:', response.data.error);
        alert('Failed to schedule appointment');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error.message);
      alert('Failed to schedule appointment');
    }
  };

  // Event handlers
  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

  const handleStatusChange = (event) => {
    setAppointmentStatus(event.target.value);
  };

  const handleBack = () => {
    navigate('/patientdashboard');
  };

  return (
    <div className="create-appointment">
      <h2>Create Appointment</h2>
      <button onClick={handleBack} className='back-to-dashboard'>Back to Dashboard</button>
      <fieldset>
        <legend>Patient and Doctor Information</legend>
        <div>
          <label>Patient Name:</label>
          <div>{patientName}</div>
        </div>
        <div>
          <label>Doctor Name:</label>
          <div>{doctorName}</div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Appointment Details</legend>
        <div>
          <label>Date:</label>
          <input type="date" value={AppointmentDate} onChange={handleDateChange} />
        </div>
        <div>
          <label>Symptoms:</label>
          <input type="text" value={Symptoms} onChange={handleSymptomsChange} />
        </div>
        <div>
          <label>Appointment Status:</label>
          <select value={AppointmentStatus} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </fieldset>
      <button onClick={handleScheduleAppointment}>Schedule Appointment</button>
    </div>
  );
}

export default CreateAppointment;
