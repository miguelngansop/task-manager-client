import React, { useState, useEffect } from 'react';
import "./NewTask.css";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TaskService from '../services/taskService';

const EditTask = ({ taskData, handleEditTask }) => {
  const [todoInput, setTodoInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [importance, setImportance] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    setTitleInput(taskData.title || "");
    setTodoInput(taskData.description || "");
    handleDateChange(new Date(taskData.due_date) || new Date());
    setImportance(taskData.importance || "");
  }, [taskData]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setImportance(event.target.value);
  };

  const handleClose = () => {
    handleEditTask();
  }

  const updateTodo = (e) => {
    if (titleInput && todoInput && importance) {
      handleEditTask();
      TaskService.updateTask(taskData.id, {
        completed: taskData.completed,
        due_date: selectedDate,
        title: titleInput,
        description: todoInput,
        importance: importance
      }).then(response => {
        console.log('La tâche a été mise à jour : ', response);
      }).catch(error => {
        setError(error?.message);
        console.log("error: ", error);
      });
    } else {
      alert("fill in all fields or click x to exit")
    }
    e.preventDefault();
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div id="edit-task">
        <div className="newTask">
          <div className="input-content">
            <h3>Title</h3>
            <input
              className="title-input"
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
              type="text"
              placeholder="What needs be done ?" />
          </div>
          <div className="input-content">
            <h3>Description</h3>
            <textarea
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              type="text"
              placeholder="Description about this task"></textarea>
          </div>
          <div className="input-content">
            <h3>Date picker</h3>
            <KeyboardDatePicker
              className="date-picker"
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              minDate={new Date()}
              format="MM/dd/yyyy"
            />
          </div>
          <div className="input-content">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Importance</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={importance}
                onChange={handleChange}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </div>
          <button className="btnNew" onClick={updateTodo} >Update Task</button>
          <p onClick={handleClose} className="close" >X</p>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default EditTask;
