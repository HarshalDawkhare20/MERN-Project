import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink, useNavigate } from 'react-router-dom'
//import signpic from "../images/signup.svg"

const Signup = () => {
 
  const navigate = useNavigate();

  const [ user, setUser ] = useState({
    name:"", email:"", phone:"", work:"", password:"", cpassword:""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
  }

  const postData = async (e) => {
      e.preventDefault();
      const {name, email, phone, work, password, cpassword} = user;
      
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, cpassword
        })
      });

      const data = await res.json();
      

      if(res.status === 422 || !data)
      {
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }
      else{
        console.log(data);
         window.alert("Registration Successful!");
         console.log("Registration Successful!");

         navigate("/login");
      }
  }


  return (
    <div>
      <section className="signup">
        <div className="container mt-4">
          <div className="signup-content">
            <div className="signup-form">

              <h2 className="form-title"><i className="zmdi zmdi-account"></i> Sign Up</h2>

              <form method='POST' className="register-form" id='register-form'>

                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account-box"></i> Name
                  </label>
                  <input type="text" name="name" id="name" autoComplete='off' className="form-control" 
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your Name" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i> Email address
                  </label>
                  <input type="email" className="form-control" name="email" id="email" 
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your Email" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk"></i> Phone
                  </label>
                  <input type="number" name="phone" id="phone" autoComplete='off' className="form-control" 
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Your Phone Number" />
                </div>

                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow"></i> Professsion
                  </label>
                  <input type="text" name="work" id="work" autoComplete='off' className="form-control" 
                  value={user.work}
                  onChange={handleInputs}
                  placeholder="Your Profession" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i> Password
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off' className="form-control" 
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Your Password" />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock"></i> Confirm Password
                  </label>
                  <input type="password" name="cpassword" id="cpassword" autoComplete='off' className="form-control" 
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Your Password" />
                </div>
  
                <br />

                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="btn btn-primary"  value="Register" onClick={postData}/>
                </div>

                <NavLink className="nav-link" to="/login">Registered Already!</NavLink>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup