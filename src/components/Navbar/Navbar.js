import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import logo from "../../img/logo.svg";
import unphoto from "../../img/up.png";
import { NavLink, useHistory } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from "../../services/authService"
import authService from '../../services/authService';


library.add(fab, faAngleDown);


const Navbar = ({menuProfile, menuLogout, handleHome}) => {

  const [username, setUsername] = useState("");
  const [down, setDown] = useState(false);
  const [url, setUrl] = useState();
  const [error, setError] = useState("")
  
  const currentUser = AuthService.getCurrentUser() ;

  const history = useHistory();

  //Function Display Username
  const displayName = () => {
    setUsername(currentUser.username);
  }

  setTimeout(displayName, 1000);

  //Function Display Menu-Down
  const handleClickDown = () => {
    setDown(!down);
  }

  //Handle Log Out
  async function handleLogout() {
    setError("")

    try {
      authService.logout();
      history.push("/login")
    } catch (error) {
      setError("Failed to log out")
    }

  }

  return (
    <div id="navbar" > 
      <div className="left-section-navbar" >
        {/* <img className="logo" src={logo} /> */}
        <h2>Todo App</h2>
      </div>
      <div className="right-section-navbar" >
        <div className="user" >
           <div className="username" onClick={handleClickDown} >
              <h3>{username}</h3>
              <div>
                <FontAwesomeIcon icon={faAngleDown} className={down ? "up_icon" : "down_icon"} />
              </div>             
            </div>  
            {
              down && 
              <div className={ down ? "down op" : "down" } >
              <h4 onClick={handleLogout} >{menuLogout}</h4>              
             </div>
            }
            
        </div>
       <div className="bg" style={{backgroundImage: `url(${url || unphoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width:"50px", height:"50px", position: "relative", borderRadius: "5px" }} ></div>
      </div>
    </div>
  )
}

export default Navbar
