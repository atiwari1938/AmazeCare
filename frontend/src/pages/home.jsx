import React from 'react';
//import '../styles/home.css';
import Hero from '../components/Bookappointment';
import Location from '../components/locationcomponent';
import Info from '../components/Services';
import About from '../components/aboutus';
import Reviews from '../components/reviews';

function Home() {
  return (
    <div className="home-container">
      <h1 style={{textAlign:'center',fontFamily:'monospace'}}>Welcome to the Amaze Care group of hospitals</h1>
      <hr />
      { <Hero /> }
      { <Info /> }
      { <Location /> }
      { <About /> }
      <br/>
      { <Reviews/> }
    
    </div>
  );
}

export default Home;
