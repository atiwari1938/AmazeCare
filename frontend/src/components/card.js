import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card">
      <h3>{data.DoctorName || data.PatientName}</h3>
      <p>{data.Speciality || data.Age}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Card;
