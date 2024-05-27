import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/createRecord.css';

function CreateRecord() {
  const [formData, setFormData] = useState({
    CurrentSymptoms: '',
    PhysicalExamination: '',
    TreatmentPlan: '',
    RecommendedTests: '',
    AppointmentID: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3009/api/v1/medical/createrecord', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        navigate('/doctordashboard');
      } else {
        console.error('Error creating medical record:', response.data.error);
      }
    } catch (error) {
      console.error('Error creating medical record:', error.message);
    }
  };

  return (
    <div className="create-record-container">
      <h2>Create Medical Record</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Medical Record Details</legend>
          <div className="form-group">
            <label>Current Symptoms</label>
            <input type="text" name="CurrentSymptoms" value={formData.CurrentSymptoms} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Physical Examination</label>
            <input type="text" name="PhysicalExamination" value={formData.PhysicalExamination} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Treatment Plan</label>
            <input type="text" name="TreatmentPlan" value={formData.TreatmentPlan} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Recommended Tests</label>
            <input type="text" name="RecommendedTests" value={formData.RecommendedTests} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Appointment ID</label>
            <input type="text" name="AppointmentID" value={formData.AppointmentID} onChange={handleChange} required />
          </div>
          <button type="submit" className="form-button">Create Record</button>
          <button type="button" className="form-button" onClick={() => navigate('/doctordashboard')}>Back to Dashboard</button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateRecord;
