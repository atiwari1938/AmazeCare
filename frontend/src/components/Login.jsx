import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default role to Patient
  const [isRegistering, setIsRegistering] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3009/api/v1/user/login', {
        Email: email,
        Passwordd: password,
        UserRole: role,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', role);

        switch (role) {
          case 'Patient':
            navigate('/patientdashboard');
            break;
          case 'Doctor':
            navigate('/doctordashboard');
            break;
          case 'Admin':
            navigate('/admindashboard');
            break;
          default:
            alert('Invalid role');
        }

        alert("Login successful");
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      alert('Error logging in');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3009/api/v1/user/patientregister', {
        PatientName: patientName,
        Age: age,
        Gender: gender,
        ContactNumber: contactNumber,
        Email: email,
        Passwordd: password,
        UserRole: 'Patient',
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'Patient');
        alert('Registration successful, please login');
        setIsRegistering(false);
        navigate('/patientdashboard');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      alert('Error registering');
    }
  };

  return (
    <div className="login-container">
      {isRegistering ? (
        <form onSubmit={handleRegister} className="login-form">
          <h2>Register as a Patient</h2>
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <button type="button" onClick={() => setIsRegistering(false)}>Back to Login</button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => setIsRegistering(true)}>Create a account</button>
        </form>
      )}
    </div>
  );
}

export default Login;
