import React, {useState, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink, useNavigate } from 'react-router-dom'

import { UserContext } from '../App'

const Login = () => {
  
  const { state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
       e.preventDefault();

       const res = await fetch('/signin', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email, password
            })
       });

       const data = res.json();
       
       if(res.status === 400 || !data)
       {
        window.alert("Invalid Credentials");
       }
       else
       {
        dispatch({type:"USER", payload:true});
        window.alert("Login Successful!");
        navigate('/');
       }

  }



  return (
    <>
      <section className="sign-in">
        <div className="container mt-4">
          <div className="sign-in-content">
            <div className="sign-in-form">

              <h2 className="form-title"><i className="zmdi zmdi-account"></i> Sign In</h2>

              <br />

              <form method='POST' className="login-form" id='login-form'>


                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i> Email address
                  </label>
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}     
                  />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>


                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i> Password
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off' className="form-control" placeholder="Your Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}     
                  />
                </div>


                <br />

                <div className="form-group form-button">
                  <input type="submit" name="sign-in" id="sign-in" className="btn btn-primary" value="Log In"
                  onClick={loginUser} />
                </div>

                <NavLink className="nav-link" to="/signup">Create a new account.!</NavLink>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login