import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/patientDashboard.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { left } from '@popperjs/core';

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showCompletedConsulting, setShowCompletedConsulting] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [completedConsulting, setCompletedConsulting] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3009/api/v1/patient/patientinfo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPatientName(response.data.patient.PatientName);
      } catch (error) {
        console.error('Error fetching patient info:', error.message);
      }
    };

    fetchPatientInfo();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is not available');
        return;
      }

      const response = await axios.get('http://localhost:3009/api/v1/doctor/getalldoctors', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        console.error('Error fetching doctors:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
    }
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    const decodedToken = jwtDecode(token);
    const patientId = decodedToken.patientId;

    try {
      const appointmentResponse = await axios.get(`http://localhost:3009/api/v1/appointment/getappointmentbypatientid/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (appointmentResponse.data.success) {
        const fetchedAppointments = appointmentResponse.data.appointment;
        const doctorResponse = await axios.get('http://localhost:3009/api/v1/doctor/getalldoctors', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (doctorResponse.data.success) {
          const doctorMap = {};
          doctorResponse.data.doctors.forEach(doctor => {
            doctorMap[doctor.DoctorID] = doctor.DoctorName;
          });

          const appointmentsWithDoctorNames = fetchedAppointments.map(appointment => ({
            ...appointment,
            DoctorName: doctorMap[appointment.DoctorID] || 'Unknown',
          }));

          setAppointments(appointmentsWithDoctorNames);
          setShowAppointments(true);
        } else {
          console.error('Error fetching doctors:', doctorResponse.data.error);
        }
      } else {
        console.error('Error fetching appointments:', appointmentResponse.data.error);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const fetchCompletedConsulting = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    const decodedToken = jwtDecode(token);
    const patientId = decodedToken.patientId;

    try {
      const response = await axios.get(`http://localhost:3009/api/v1/prescription/getcompletedconsultingbypatientid/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const completedConsultingDetails = response.data.completedConsulting.map(consulting => {
          const { AppointmentID, Doctor, AppointmentDate, Record } = consulting;
          const DoctorName = Doctor.DoctorName;

          if (Record) {
            const { Prescriptions } = Record;
            if (Prescriptions && Prescriptions.length > 0) {
              return Prescriptions.map(prescription => ({
                AppointmentID,
                DoctorName,
                AppointmentDate,
                Medicine: prescription.Medicine,
                Instructions: prescription.Instructions,
                Dosage: prescription.Dosage,
                PrescriptionID: prescription.PrescriptionID
              }));
            }
          } else {
            return [{
              AppointmentID,
              DoctorName,
              AppointmentDate,
              Medicine: 'N/A',
              Instructions: 'N/A',
              Dosage: 'N/A',
              PrescriptionID: 'N/A'
            }];
          }
        }).flat();

        setCompletedConsulting(completedConsultingDetails);
        setShowCompletedConsulting(true);
      } else {
        console.error('Error fetching completed consulting:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching completed consulting:', error.message);
    }
  };

  const handleViewDoctors = () => {
    setShowDoctors(!showDoctors);
    if (!showDoctors) {
      fetchDoctors();
    }
  };

  const handleViewAppointments = () => {
    setShowAppointments(!showAppointments);
    if (!showAppointments) {
      fetchAppointments();
    }
  };

  const handleViewCompletedConsulting = () => {
    setShowCompletedConsulting(!showCompletedConsulting);
    if (!showCompletedConsulting) {
      fetchCompletedConsulting();
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleScheduleAppointment = (doctorId) => {
    navigate('/create-appointment', { state: { doctorID: doctorId } });
  };

  const handleReschedule = (appointmentId) => {
    console.log('Rescheduling appointment with ID:', appointmentId);
    setRescheduleAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  useEffect(() => {
    console.log('showRescheduleModal state has changed:', showRescheduleModal);
  }, [showRescheduleModal]);

  const handleRescheduleSubmit = async () => {
    console.log('Submitting reschedule for appointment ID:', rescheduleAppointmentId, 'with new date:', newAppointmentDate);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3009/api/v1/appointment/reschedule/${rescheduleAppointmentId}`,
        { AppointmentDate: newAppointmentDate },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        console.log('Reschedule successful:', response.data);
        fetchAppointments();
        setShowRescheduleModal(false);
        setRescheduleAppointmentId(null);
        setNewAppointmentDate('');
      } else {
        console.error('Error rescheduling appointment:', response.data.error);
      }
    } catch (error) {
      console.error('Error rescheduling appointment:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.DoctorName.toLowerCase().includes(search.toLowerCase())
  );
  console.log('Rendering modal:', showRescheduleModal);

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h4>Patient Dashboard</h4>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2 style={{textAlign:left}}>Welcome, {patientName}</h2>
      <div className="services-section">
        <button onClick={handleViewDoctors}>
          {showDoctors ? 'Hide Doctors' : 'View Doctors'}
        </button>
        <button onClick={handleViewAppointments}>
          {showAppointments ? 'Hide Appointments' : 'View Appointments'}
        </button>
        <button onClick={handleViewCompletedConsulting}>
          {showCompletedConsulting ? 'Hide Completed Consulting' : 'View Completed Consulting'}
        </button>
      </div>
      {showDoctors && (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for doctors"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="doctor-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Speciality</th>
                  <th>Experience</th>
                  <th>Qualification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.DoctorID}>
                    <td>{doctor.DoctorName}</td>
                    <td>{doctor.Speciality}</td>
                    <td>{doctor.Experience}</td>
                    <td>{doctor.Qualification}</td>
                    <td>
                      <button onClick={() => handleScheduleAppointment(doctor.DoctorID)}>Schedule Appointment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showAppointments && (
        <div className="appointment-table">
          <h3>Upcoming Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.AppointmentID}>
                    <td>{appointment.DoctorName}</td>
                    <td>{new Date(appointment.AppointmentDate).toLocaleDateString()}</td>
                    <td>{appointment.Symptoms}</td>
                    <td>{appointment.AppointmentStatus}</td>
                    <td>
                      {appointment.AppointmentStatus !== 'completed' && (
                        <button onClick={() => handleReschedule(appointment.AppointmentID)}>Reschedule</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showCompletedConsulting && (
        <div className="completed-consulting-table">
          <h3>Completed Consulting</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor Name</th>
                <th>Medicine</th>
                <th>Instructions</th>
                <th>Dosage</th>
              </tr>
            </thead>
            <tbody>
              {completedConsulting.length > 0 ? (
                completedConsulting.map((consulting) => (
                  <tr key={consulting.PrescriptionID}>
                    <td>{new Date(consulting.AppointmentDate).toLocaleDateString()}</td>
                    <td>{consulting.DoctorName}</td>
                    <td>{consulting.Medicine}</td>
                    <td>{consulting.Instructions}</td>
                    <td>{consulting.Dosage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No completed consulting found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showRescheduleModal && (
  <div className="modal" style={{ display: showRescheduleModal ? 'flex' : 'none' }}>
    <div className="modal-content">
      <h3>Reschedule Appointment</h3>
      <input
        type="datetime-local"
        value={newAppointmentDate}
        onChange={(e) => setNewAppointmentDate(e.target.value)}
      />
      <button onClick={handleRescheduleSubmit} style={{maxWidth:"13rem",margin:"0.5rem auto"}}>Submit</button>
      <button onClick={() => setShowRescheduleModal(false)} style={{maxWidth:"13rem",margin:"0.5rem auto",backgroundColor:"red"}}>Cancel</button>
    </div>
  </div>
)}
    </div>
  );
}

export default PatientDashboard;
