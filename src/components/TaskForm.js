import React, { useState, useEffect } from 'react';
import TaskService from '../services/taskService';
import './TaskForm.css';

function TaskForm({ task, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    importance: ''
  });

  useEffect(() => {
    // If a task is provided, populate the form data with its details
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        importance: task.importance
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If a task is provided, update the task with the new data
      if (task) {
        await TaskService.updateTask(task.id, formData);
      } else {
        // Otherwise, add a new task with the form data
        await TaskService.createTask(formData);
      }
      // Trigger the onSubmit callback, if provided
      if (onSubmit) {
        onSubmit();
      }
      // Reset the form data
      setFormData({
        title: '',
        description: '',
        due_date: '',
        importance: ''
      });
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Due Date:</label>
          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} required />
        </div>
        <div>
          <label>Importance:</label>
          <select name="importance" value={formData.importance} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
      </form>
    </div>
  );
}

export default TaskForm;

