import axiosInstance from '../axiosConfig';

const TaskService = {


       // Function to create the completion status of a task
  createTask: async ( task) => {
    // Make a post request to update the completion status of the task
    return  axiosInstance.post(`/tasks/`, task );
   },

  // Function to fetch tasks from the API
  getTasks: async () => {
    return  axiosInstance.get('/tasks/');
  },

  // Function to delete a task by ID
  deleteTask: async (taskId) => {
    return axiosInstance.delete(`/tasks/${taskId}/`);
  },

  // Function to update the completion status of a task
  updateTaskCompletion: async (taskId, completed) => {
    // Make a patch request to update the completion status of the task
    return  axiosInstance.patch(`/tasks/${taskId}/`, completed );

   },



   updateTask: async (taskId, updatedTaskData) => {
      // Make a Put request to update the task with the specified ID
      return  axiosInstance.put(`/tasks/${taskId}/`, updatedTaskData);
    }

};

export default TaskService;
