import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/home';
import PatientDashboard from './components/patientDashboard';
import DoctorDashboard from './components/doctorDashboard';
import AdminDashboard from './components/adminDashboard';
import BookAppointment from './components/Bookappointment';
import AddDoctor from './components/adddoctor';
import AddPatient from './components/addpatient';
import UpdateDoctor from './components/updateDoctor';
import UpdatePatient from './components/updatePatient';
import CreatePrescription from './components/CreatePrescription';
import Header from './components/layout/Header';
import Footer from './components/layout/footer';
import CreateAppointment from './components/CreateAppointment';
import CreateRecord from './components/createRecord';
import About from './components/aboutus';
import Info from './components/Services';
import Location from './components/locationcomponent';
import Reviews from './components/reviews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/appointment" element={<BookAppointment />} />
            <Route path='/patientdashboard' element={<PatientDashboard />}/>
            <Route path='/doctordashboard'element={<DoctorDashboard />}/>
            <Route path='/admindashboard' element={<AdminDashboard />}/>
            <Route path='/add-doctor' element={<AddDoctor/>}/>
            <Route path='/add-patient' element={<AddPatient/>}/>
            <Route path='/update-doctor/:id' element={<UpdateDoctor/>}/>
            <Route path='/update-patient/:id' element={<UpdatePatient/>}/>
            <Route path='/create-appointment' element={<CreateAppointment />}/>
            <Route path='/create-prescription' element={<CreatePrescription />}/>
            <Route path='/create-record' element={<CreateRecord />}/>
            <Route path='/About' element={<About />}/>
            <Route path='/reviews' element={<Reviews />}/>
            <Route path='/Services' element={<Info />}/>
            <Route path='/locations' element={<Location />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
