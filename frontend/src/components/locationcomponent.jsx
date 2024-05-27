// src/components/Location.js
import React, { useState } from "react";
import "../styles/locationcomponent.css";
import hspimg from "../assets/hsp.jpg";


const locations = [
  { name: "Ahmedabad", image: hspimg,icon: require("../assets/icons/ahmedabad.png"), info: "Plot No.1A, Bhat GIDC Estate Dist. Airport Gandhinagar Road, Dist. Gandhinagar, Ahmedabad - 382428 Gujarat", phone: "+8401801066" },
  { name: "Aragonda", image: hspimg,icon: require("../assets/icons/aragonda.png"), info: "Aragonda (V), Thavanampalli (M), Chittoor (D)", phone: "08573 283 220/221/222" },
  { name: "Banglore", image: hspimg,icon: require("../assets/icons/banglore.png"), info: "154 / 11, Bannerghatta Road Opp. I.I.M Bangalore - 560 076", phone: "+(91)-80-2630 4050" },
  { name: "Bhubaneshwar", image: hspimg,icon: require("../assets/icons/bhubaneshwar.png"), info: "Plot No. 251, Old Sainik School Road Bhubaneshwar - 750 015", phone: "06746661016" },
  { name: "Bilaspur", image: hspimg,icon: require("../assets/icons/bilaspur.png"), info: "Amaze Care Hospitals Bilaspur, Seepat Road, Bilaspur, Chhattisgarh, 495006", phone: "+ 91-7752-433433, 433233" },
  { name: "Bhopal", image: hspimg,icon: require("../assets/icons/bhopal.png"), info: "Amaze Care Hospitals, E-8 Extension, Arera Colony, Bhopal - 462026", phone: "0755-4308101" },
  { name: "Chennai", image: hspimg,icon: require("../assets/icons/chennai.png"), info: "21, Greams Lane, Off Greams Road Chennai – 600006", phone: "+91-44-40401066" },
  { name: "Delhi", image: hspimg,icon: require("../assets/icons/delhi.png"), info: "Sarita Vihar Delhi Mathura Road, New Delhi - 110076 (India)", phone: "+(91)-80-2630 4050" },
  { name: "Guwahati", image: hspimg,icon: require("../assets/icons/guwahati.png"), info: "Amaze Care Hospitals, Guwahati Unit: International Hospitals Lotus Tower, Christian Basti, G.S.Road Guwahati - 781 005", phone: "+(91)-80-2630 4050" },
  { name: "Hyderabad", image: hspimg,icon: require("../assets/icons/hyderabad.png"), info: "Film Nagar, Jubilee Hills, Hyderabad, Telangana State, India. Toll No – 1860 500 1066", phone: "+ 91-40-2360 7777 / 5555 / 2000" },
  { name: "Indore", image: hspimg,icon: require("../assets/icons/indore.png"), info: "Scheme No. 74 C, Sector D, Vijay Nagar, Indore 452 010 (Madhya Pradesh)", phone: "0731-2445566" },
  { name: "Kakinada", image: hspimg,icon: require("../assets/icons/kakinada.png"), info: "13-1-3, Suryaraopeta Main Road, Kakinada - 533 001", phone: "+91-884-2345700 / 800" },
  { name: "Karur", image: hspimg,icon: require("../assets/icons/karur.png"), info: "163 - AE, Allwyn Nagar Kovai Road Karur - 639002", phone: "+(91)-90-6530 8080" },
  { name: "Kolkata", image: hspimg,icon: require("../assets/icons/kolkata.png"), info: "58, Canal Circular Road Kolkata - 700 054", phone: "+(91)-80-2630 4050" },
  { name: "Kochi", image: hspimg,icon: require("../assets/icons/kochi.png"), info: "Amaze Care Hospital Angamaly, Cable Junction, Ernakulam District, National Highway 47 Karukutty, Kerala 683576", phone: "+(91)-80-2630 4050" },
  { name: "Lucknow", image: hspimg,icon: require("../assets/icons/lucknow.png"), info: "Amaze Care Hospitals Kanpur Lucknow Rd, Sector B Bargawan, LDA Colony, Lucknow, Uttar Pradesh 226012", phone: "+(91)-80-2630 4050" },
  { name: "Madurai", image: hspimg,icon: require("../assets/icons/madurai.png"), info: "Lake View Road, K.K. Nagar, Madurai - 625 020", phone: "+(91)-80-2630 4050" },
  { name: "Mumbai", image: hspimg,icon: require("../assets/icons/mumbai.png"), info: "Parsik Hill Road, Sector 23, CBD Belapur, Navi Mumbai - 400 614", phone: " +(91)-22 3350 3350" },
  { name: "Mysore", image: hspimg,icon: require("../assets/icons/mysore.png"), info: "Adhichunchanagiri Road Kuvempunagar, Mysore - 570 023", phone: "+(91)-80-2630 4050" },
  { name: "Nashik", image: hspimg,icon: require("../assets/icons/nashik.png"), info: "Swaminarayan Nagar Near Lunge Mangal Karyalaya New Adgaon Naka, Panchavati Nashik 422 003, Maharashtra.", phone: "+91-253 2510 250 / 350 / 450 / 550 / 750" },
  { name: "Nellore", image: hspimg,icon: require("../assets/icons/nellore.png"), info: "Amaze care specialty Hospitals Nellore, 16/111, 1133, Muthukur Rd, Pinakini Avenue, Ramji Nagar, Nellore, Andhra Pradesh 524004", phone: "+(91)-80-2630 4050" },
  { name: "Noida", image: hspimg,icon: require("../assets/icons/noida.png"), info: "E 2, Amaze Care Hospitals Rd, Block E, Sector 26, Noida, Uttar Pradesh 201301", phone: "+0120-401200" },
  { name: "Rourkela", image: hspimg,icon: require("../assets/icons/rourkela.png"), info: "SECTOR-19, NEAR NEHRU PARK,ROURKELA", phone: "0661-2433484, 9124556935 & 88955034484" },
  { name: "Trichy", image: hspimg,icon: require("../assets/icons/trichy.png"), info: "Ariyamangalam Area, Chennai - Madurai Highway, Trichy - 620 010", phone: " +91 - 431 - 660 7777, +91 - 431 - 220 7777" },
  { name: "Visakhapatnam", image: hspimg,icon: require("../assets/icons/visakhapatnam.png"), info: "Plot No:1, Arilova, Chinagadali, Visakhapatnam-530040, Andhra Pradesh, India.", phone: " (0891): +91 891 2867777" }
];

function Location() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
 

  return (
    <div className="location-container">
         <div className="location-info" > 
        <h4>LOCATION</h4>
        <h2>Hospitals In India</h2>
        <p>Amaze care Group constitutes the best hospital in India with over 10,000 beds across 73 hospitals, 5000+ pharmacies, over 300 clinics, 1100+ diagnostic centres and 200+ Telemedicine units.</p>
      </div>
      <br/>
        <div className = "location-wrap" >
            
      <div className="location-list">
        
        {locations.map((location, index) => (
            <div
            key={index}
            className={`location-item ${selectedLocation.name === location.name ? "active" : ""}`}
            onClick={() => setSelectedLocation(location)}
            >
            <img src={location.icon} alt={location.name} className="location-icon" />
            <p>{location.name}</p>
          </div>
        ))}
      </div>
      <div className="location-details">
        <img src={selectedLocation.image} alt={`Hospitals in ${selectedLocation.name}`} className="location-image" />
        <h2>Hospitals in {selectedLocation.name}</h2>
        <p>{selectedLocation.info}</p>
        <p className="phone-number">{selectedLocation.phone}</p>
      </div>
        </div>
    </div>
  );
}

export default Location;
