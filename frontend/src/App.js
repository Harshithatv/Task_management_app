import React from 'react';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';


const App = () => {
  return (
    <div>
     
   

    <Router>
      <Layout>
    <Routes>
     
    <Route path="/" element={<Dashboard />} />
    <Route path="/tasks" element={<TaskList />} />

       
        </Routes>
        </Layout>
        </Router>
        </div>
    
  );
};

export default App;
