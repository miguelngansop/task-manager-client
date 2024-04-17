import React, {useState, useEffect} from 'react'
import "./Card.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faClock, faTrashAlt, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from "moment"
import TaskService from "../../services/taskService"
import AuthService from "../../services/authService"

library.add(fab)

const Card = ({ id, completed, title, description, due_date, importance }) => {

  const currentUser = AuthService.getCurrentUser ;

  const [flagColor, setFlagColor] = useState("");
  const [isdone, setIsDone] = useState(false);

  const  deleteTodo = () => {
    TaskService.deleteTask( id ).then( response => {
        console.log("deleted: ", response)
      }).catch(error=> {
        console.log("error on delete: ", error)
      })

  }

  const toggleProgress = () => {
    TaskService.updateTaskCompletion(  id, { completed: !completed}).then((resp)=>{
      setIsDone( !completed)
      console.log(resp.data)
    }).catch(er=>{
      console.log("error: ", er)
    } )
  }

  // Get Color Flag
  useEffect(()=> {
    if(importance === 'Low') {
    setFlagColor("green");
  }else if(importance === 'Medium'){
    setFlagColor("orange");
  }else if(importance === 'High'){
    setFlagColor("red");
  }
  }, [])
  

  return (
    <div className="card" >
      <div className="card__container" >
        <div className="into" >
          <div>
          <i>{ isdone ? 'done' : 'todo'}</i>
            <div className="title" >
              <h2>{title}</h2>
            </div>

            <FontAwesomeIcon title="delete" className="delete" onClick={deleteTodo} icon={faTrashAlt}  />

          </div>
          <div className={description?.length > 100 ? ' text scroll' : "text noscroll"}  >
            <p>{description}</p>
          </div>
        </div>
        <div className="into into__down" >
          <div className="time" >
            <h4>
            <FontAwesomeIcon icon={faClock}  />
                  <span >{moment(due_date).format('L')} </span>
                  <span> <FontAwesomeIcon icon={faFlag} className={flagColor} /></span>
                  </h4>
          </div>     
          <div onClick={toggleProgress} className={completed ? "completed" : "completed gray"}>
          </div> 
          </div>   

      </div>
    </div>
    
  )
}
export default Card
