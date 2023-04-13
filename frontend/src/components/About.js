import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"
import logo from "../images/logo_raje.png"

const About = () => {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
      });

      const data = await res.json()
      console.log(data);
      setUserData(data);

      if(!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
     callAboutPage();
  },[]);
  

  return (
    <>
        
        <div method="get" className='about'>
          <div className="ab-title">
            <h2>Your Profile</h2>
          
             <h5>Name: {userData.name}</h5>
             <h5>Email: {userData.email}</h5>
             <h5>Phone: {userData.phone}</h5>
             <h5>Profession: {userData.work}</h5>
          </div>
          <div className="img-ab">
            <img src={logo} alt="logo " />

          </div>
        </div>
    
    </>
  )
}

export default About