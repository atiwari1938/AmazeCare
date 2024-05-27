import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/createPrescription.css';

function CreatePrescription() {
  const [recordID, setRecordID] = useState('');
  const [medicine, setMedicine] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dosage, setDosage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3009/api/v1/prescription/createprescription', {
        RecordID: recordID,
        Medicine: medicine,
        Instructions: instructions,
        Dosage: dosage
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        navigate('/doctor-dashboard');
      } else {
        console.error('Error adding prescription:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding prescription:', error.message);
    }
  };

  return (
    <div className="create-prescription">
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Prescription Information</legend>
          <div>
            <label>Record ID:</label>
            <input
              type="text"
              value={recordID}
              onChange={(e) => setRecordID(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Medicine:</label>
            <input
              type="text"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Dosage:</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Prescription</button>
          <div className="button-container">
          <button type="button" className="back-button" onClick={() => navigate('/doctordashboard')}>Back to Dashboard</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default CreatePrescription;
