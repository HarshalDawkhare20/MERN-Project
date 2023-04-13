import React, {useState, useEffect} from 'react'
import iphonelogo from "../images/iphone.png"
import fillmsglogo from "../images/filled-message.png"
import maplogo from "../images/map-marker.png"


const Contact = () => {

  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});

  //authentication for user anf getting data
  

  const userContact = async () => {
    try {
      const res = await fetch('/getData', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
      });

      const data = await res.json()
      console.log(data);
      setUserData({...userData, name: data.name, email: data.email, phone: data.phone});

      if(!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      
    }
  }

  useEffect(() => {
     userContact();
  },[]);

  //storing input data in states

  const handleInputs = (e) => {
     const name  = e.target.name;
     const value = e.target.value;

     setUserData({...userData, [name]:value });
  }

  //send the data to database
  const contactForm = async (e) => {
    e.preventDefault();
    const {name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();

    if(!data){
      console.log("Message not send");
    }
    else{
      alert("Message sent");
      setUserData({...userData, message: ""});
    }
  }



  return (
    <>
      <div className="contact_info">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">


                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image"><img src={iphonelogo} alt="iphone" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Phone</div>
                    <div className="contact_info_text">+91 9876 543 2198</div>
                  </div>
                </div>


                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image"><img src={fillmsglogo} alt="" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">contact@bbbootstrap.com</div>
                  </div>
                </div>


                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image"><img src={maplogo} alt="" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Address</div>
                    <div className="contact_info_text">298,Menlo Park,CA,USA</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container">
                <div className="contact_form_title">Get in Touch</div>

                <form method='POST' id="contact_form">
                  <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <input type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Your name" 
                      name="name"
                      value={userData.name}
                      onChange={handleInputs} 
                      required="required" data-error="Name is required."/>
                    <input type="text" id="contact_form_email" className="contact_form_email input_field" placeholder="Your email" 
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}    
                      required="required" data-error="Email is required." />
                    <input type="text" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your phone number" 
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}  
                    />
                      
                    
                  </div>
                  <div className="contact_form_text">
                        <textarea id="contact_form_message" className="text_field contact_form_message" rows="4" 
                        name="message"
                        value={userData.message}
                        onChange={handleInputs}
                        placeholder="Message" required="required" data-error="Please, write us a message."></textarea>
                  </div>
                  <div className="contact_form_button">
                        <button type="submit" className="button contact_submit_button"
                        onClick={contactForm}>Send Message</button>
                  </div>
                </form>

                  
              </div>
            </div>
          </div>
          <div className="panel"></div>
        </div>
      </div>

      </>
      )
}

      export default Contact