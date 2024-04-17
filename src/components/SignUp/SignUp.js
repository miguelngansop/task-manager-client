import React, {useRef, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import authService from "../../services/authService";

import "./SignUp.css";


const Signup = () => {

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match")
    }

    authService.register( { "email": emailRef.current.value, "password": passwordRef.current.value, "username": nameRef.current.value })
    .then(response => {
      setError("")
      //setFormData({ ...formData, redirectToLogin: true });
      //if (formData.redirectToLogin) {
      history.push("/");
    //  }
    }).catch(error=> {
      setError("Failed to create an account")
      console.error('Registration failed:', error);

    }).finally( ()=> {
      setLoading(false)
    })
  }

  return (
    <>
       <div id="sign-up" >
        <div class="container" >
          <div class="content" >
            <div class="into" >
              <form onSubmit={handleSubmit} >
                <div>
                {error && <p class="error" >{error}</p>}
                  <input placeholder="Username" type="text" required ref={nameRef}  />
                  <input placeholder="Email" type="email" required ref={emailRef}  />
                  <input placeholder="Password" type="password" required  ref={passwordRef}  />
                  <input placeholder="Password Confirm" type="password" required ref={passwordConfirmRef}  />
                </div>
                <div class="sign-up_section" >
                  <button disabled={loading} type="submit" >Sign Up</button>
                </div>             
              </form>
            </div>
          </div>
          <div class="content" >
            <div class="into" >
              <h2>Sign Up</h2>
              <p>Register and create an account on Todo List. Write  your tasks anytime and anywhere</p>
              <p class="already" >Already have an account ? <Link to="/login">Login</Link></p>
            </div>  
          </div>
          
        </div>
      </div>
    </>

  )
}

export default Signup