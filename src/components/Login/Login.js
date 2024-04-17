import React, {useRef, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import authService from "../../services/authService";


import "./Login.css"


const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    
    setLoading(true)
    authService.login(emailRef.current.value,  passwordRef.current.value) .then((response) => {
      const userData = response.data; //  response.data contains { token, username, email }
      localStorage.setItem('userData', JSON.stringify(userData));
      history.push("/");
      setError("")
    }) .catch( (error)=> {
      setError("Failed to sign in")
      console.log("error: ", error)
    })
  }

  return (
    <>
      <div id="login" >
        <div class="container" >
          <div class="content" >
            <div class="into" >
              <h2>Login</h2>
              <p>Log in and start creating your next task</p>
              <p>Do not have an account ? <Link to="/signup">Sign up</Link></p>
            </div>  
          </div>
          <div class="content" >
            <div class="into" >
              <form onSubmit={handleSubmit} >
                <div>
                {error && <p class="error" >Failed to login</p>}
                  <input placeholder="Email" type="email" required ref={emailRef}  />
                  <input placeholder="Password" type="password" ref={passwordRef}  />
                </div>
                <div class="login_section" >
                  <button disabled={loading} type="submit" >Login</button>
                  {/* <p class="forgot" >Forgot your password ? <Link to="/forgot-password">Forgot Password</Link></p> */}
                </div>             
              </form>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Login