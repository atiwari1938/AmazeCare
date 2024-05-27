import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/doctorDashboard.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function DoctorDashboard() {
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showCompletedAppointments, setShowCompletedAppointments] = useState(false);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const doctorID = decodedToken.id;
        if (!doctorID) {
          console.error('DoctorID not found in token');
          return;
        }

        const response = await axios.get(`http://localhost:3009/api/v1/doctor/getdoctorbyid/${doctorID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor info:', error.message);
      }
    };

    fetchDoctorInfo();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const doctorID = decodedToken.id;
      if (!doctorID) {
        console.error('DoctorID not found in token');
        return;
      }

      const response = await axios.get(`http://localhost:3009/api/v1/appointment/getappointmentbydoctorid/${doctorID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const appointmentsWithPatientNames = await Promise.all(response.data.appointment.map(async (appointmentItem) => {
          const patientResponse = await axios.get(`http://localhost:3009/api/v1/patient/getpatientbyid/${appointmentItem.PatientID}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          appointmentItem.PatientName = patientResponse.data.patient.PatientName;
          return appointmentItem;
        }));
        setAppointments(appointmentsWithPatientNames);
        setShowAppointments(true);
      } else {
        console.error('Error fetching appointments:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const fetchCompletedAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const doctorID = decodedToken.id;
      if (!doctorID) {
        console.error('DoctorID not found in token');
        return;
      }

      const response = await axios.get(`http://localhost:3009/api/v1/appointment/getappointmentwithdetails/${doctorID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const completedAppointments = response.data.appointments.filter(appointment => appointment.AppointmentStatus === "completed");
        const appointmentsWithPatientNames = await Promise.all(completedAppointments.map(async (appointmentItem) => {
          const patientResponse = await axios.get(`http://localhost:3009/api/v1/patient/getpatientbyid/${appointmentItem.PatientID}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          appointmentItem.PatientName = patientResponse.data.patient.PatientName;
          return appointmentItem;
        }));
        setCompletedAppointments(appointmentsWithPatientNames);
        setShowCompletedAppointments(true);
      } else {
        console.error('Error fetching completed appointments:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching completed appointments:', error.message);
    }
  };

  const fetchMedicalRecords = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3009/api/v1/medical/getallrecord', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMedicalRecords(response.data.MedicalRecords);
        setShowMedicalRecords(true);
      } else {
        console.error('Error fetching medical records:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error.message);
    }
  };

  const fetchPrescriptions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3009/api/v1/prescription/getallprescription', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPrescriptions(response.data.Prescriptions); 
        setShowPrescriptions(true);
      } else {
        console.error('Error fetching prescriptions:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error.message);
    }
  };

  const handleViewAppointments = () => {
    setShowAppointments(!showAppointments);
    if (!showAppointments) {
      fetchAppointments();
    }
  };

  const handleViewCompletedAppointments = () => {
    setShowCompletedAppointments(!showCompletedAppointments);
    if (!showCompletedAppointments) {
      fetchCompletedAppointments();
    }
  };

  const handleViewMedicalRecords = () => {
    setShowMedicalRecords(!showMedicalRecords);
    if (!showMedicalRecords) {
      fetchMedicalRecords();
    }
  };

  const handleViewPrescriptions = () => {
    setShowPrescriptions(!showPrescriptions);
    if (!showPrescriptions) {
      fetchPrescriptions();
    }
  };

  const handleMarkCompleted = async (appointmentID) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3009/api/v1/appointment/updateappointmentstatus/${appointmentID}`, {
        status: 'completed'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success){
        fetchAppointments();
      } else {
        console.error('Error updating appointment status:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddPrescription = () => {
    navigate('/create-prescription');
  };

  const handleAddMedicalRecord = () => {
    navigate('/create-record');
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <h4>Doctor Dashboard</h4>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2 style={{textAlign:'left'}}>Welcome, Dr. {doctor.DoctorName}</h2>
      <div className="services-section">
        <button onClick={handleViewAppointments}>
          {showAppointments ? 'Hide Appointments' : 'View Appointments'}
        </button>
        <button onClick={handleViewCompletedAppointments}>
          {showCompletedAppointments ? 'Hide Completed Appointments' : 'View Completed Appointments'}
        </button>
        <button onClick={handleViewMedicalRecords}>
          {showMedicalRecords ? 'Hide Medical Records' : 'View Medical Records'}
        </button>
        <button onClick={handleViewPrescriptions}>
          {showPrescriptions ? 'Hide Prescriptions' : 'View Prescriptions'}
        </button>
        <button onClick={handleAddPrescription}>Add Prescription</button>
        <button onClick={handleAddMedicalRecord}>Add Medical Record</button>
      </div>
      {showAppointments && (
        <div className="appointment-table">
          <h3>Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointmentItem) => (
                  <tr key={appointmentItem.AppointmentID}>
                    <td>{appointmentItem.PatientName}</td>
                    <td>{new Date(appointmentItem.AppointmentDate).toLocaleDateString()}</td>
                    <td>{appointmentItem.Symptoms}</td>
                    <td>{appointmentItem.AppointmentStatus}</td>
                    <td>
                      {appointmentItem.AppointmentStatus !== "completed" && (
                        <button onClick={() => handleMarkCompleted(appointmentItem.AppointmentID)}>
                          Mark as Completed
                        </button>
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
      {showCompletedAppointments && (
        <div className="appointment-table">
          <h3>Completed Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Prescriptions</th>
              </tr>
            </thead>
            <tbody>
              {completedAppointments.length > 0 ? (
                completedAppointments.map((appointmentItem) => (
                  <tr key={appointmentItem.AppointmentID}>
                    <td>{appointmentItem.PatientName}</td>
                    <td>{new Date(appointmentItem.AppointmentDate).toLocaleDateString()}</td>
                    <td>{appointmentItem.Symptoms}</td>
                    <td>{appointmentItem.AppointmentStatus}</td>
                    <td>
                      {appointmentItem.Record && appointmentItem.Record.Prescriptions ? (
                        appointmentItem.Record.Prescriptions.map((prescription) => (
                          <div key={prescription.PrescriptionID}>
                            <p>Medicine: {prescription.Medicine}</p>
                            <p>Instructions: {prescription.Instructions}</p>
                            <p>Dosage: {prescription.Dosage}</p>
                          </div>
                        ))
                      ) : (
                        <p>No prescriptions found</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No completed appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showMedicalRecords && (
        <div className="medical-records-table">
          <h3>Medical Records</h3>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Current Symptoms</th>
                <th>Physical Examination</th>
                <th>Treatment Plan</th>
                <th>Recommended Tests</th>
                <th>Appointment ID</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map((record) => (
                <tr key={record.RecordId}>
                  <td>{record.RecordId}</td>
                  <td>{record.CurrentSymptoms}</td>
                  <td>{record.PhysicalExamination}</td>
                  <td>{record.TreatmentPlan}</td>
                  <td>{record.RecommendedTests}</td>
                  <td>{record.AppointmentID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showPrescriptions && prescriptions && prescriptions.length > 0 && (
        <div className="prescriptions-table">
          <h3>Prescriptions</h3>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Medicine</th>
                <th>Instructions</th>
                <th>Dosage</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.PrescriptionID}>
                  <td>{prescription.RecordID}</td>
                  <td>{prescription.Medicine}</td>
                  <td>{prescription.Instructions}</td>
                  <td>{prescription.Dosage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
