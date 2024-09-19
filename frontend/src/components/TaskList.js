import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasklist.css'; // Import your CSS styles
import { FaEdit, FaTrashAlt, FaCheckCircle, FaPlusCircle, FaCalendarAlt } from 'react-icons/fa'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's CSS
import moment from 'moment'; // Moment.js for date formatting

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState(''); // State for error message

  // Fetch tasks when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = () => {
    if (taskForm.title.trim() === '') {
      setError('Task name is required');
      return;
    }

    axios.post('http://localhost:5000/api/tasks', taskForm)
      .then(response => {
        setTasks([...tasks, response.data]);
        resetForm();
        setIsPopupOpen(false); // Close popup after adding
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const handleUpdateTask = () => {
    if (taskForm.title.trim() === '') {
      setError('Task name is required');
      return;
    }

    axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, taskForm)
      .then(response => {
        setTasks(tasks.map(task => task._id === editingTaskId ? response.data : task));
        resetForm();
        setIsPopupOpen(false); // Close popup after updating
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId);
    setTaskForm({ title: taskToEdit.title, description: taskToEdit.description });
    setEditingTaskId(taskId);
    setIsEditing(true); // Switch to editing mode
    setIsPopupOpen(true); // Open popup for editing
    setError(''); // Reset error message
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleMarkCompleted = (taskId) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    taskToUpdate.completed = !taskToUpdate.completed;
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskToUpdate)
      .then(() => {
        setTasks(tasks.map(task => task._id === taskId ? taskToUpdate : task));
      })
      .catch(error => {
        console.error('Error marking task as completed:', error);
      });
  };

  const resetForm = () => {
    setTaskForm({ title: '', description: '' });
    setIsEditing(false);
    setEditingTaskId(null);
    setError(''); // Reset error message
  };

  return (
    <div className="tasklist">
      <h3>Manage Task</h3>
      <p style={{ fontSize: "small", marginLeft: "15px" }}>Check your daily task and schedule</p>

      <div className="todays-task-section">
        <h3>Today's Task</h3>
        <p>Check your daily task and schedule</p>
        <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
          Add New <FaPlusCircle />
        </button>
      </div>

      <div className="task-count-card">
        <div>Created: {tasks.length}</div>
        <div>Completed: {tasks.filter(task => task.completed).length}</div>
      </div>

      {/* Popup for adding/editing task */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>{isEditing ? 'Edit Task' : 'Add Task'}</h3>
            <h4>Task Name</h4>
            <input
              type="text"
              placeholder="Title"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            />
            {error && <p className="error-message">{error}</p>} {/* Display error if task name is missing */}
            <h4>Description</h4>
            {/* ReactQuill text editor with custom size */}
            <ReactQuill
              className="custom-quill-editor"
              theme="snow"
              value={taskForm.description}
              onChange={(content) => setTaskForm({ ...taskForm, description: content })}
            />
            <div className="popup-actions">
              <button onClick={isEditing ? handleUpdateTask : handleAddTask}>
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
              <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div className="task-grid">
            {tasks.map(task => (
              <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: task.description }}></p> {/* Render HTML */}
                  <p className="task-date">
                    <FaCalendarAlt /> {moment(task.createdAt).format('DD MMMM YYYY')} {/* Format the date */}
                  </p>
                </div>
                <div className="task-actions">
                  <button className="tooltip" onClick={() => handleMarkCompleted(task._id)}>
                    {task.completed ? <FaCheckCircle style={{ color: 'green' }} /> : <FaCheckCircle />}
                    <span className="tooltiptext">
                      {task.completed ? 'Unmark Completed' : 'Mark Completed'}
                    </span>
                  </button>
                  <button className="tooltip" onClick={() => handleEditTask(task._id)}>
                    <FaEdit />
                    <span className="tooltiptext">Edit</span>
                  </button>
                  <button className="tooltip" onClick={() => handleDeleteTask(task._id)}>
                    <FaTrashAlt />
                    <span className="tooltiptext">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;




