import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import Dashboard styles
import { FaTasks, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks/stats')
      .then(response => {
        setTotalTasks(response.data.totalTasks);
        setCompletedTasks(response.data.completedTasks);
      })
      .catch(error => {
        console.error('Error fetching task statistics:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card total-task-card">
          <div className="card-info">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>
          <div className="card-left">
            <FaTasks size={48} style={{ color: 'orange'}}  />
          </div>
        </div>
        <div className="card completed-task-card">
          <div className="card-info">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="card-right">
            <FaCheckCircle size={48} style={{ color: 'green'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;













