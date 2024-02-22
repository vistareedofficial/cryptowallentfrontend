import React from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';


const Dashboard = () => {
  return (
    <>
        <Navbar/>
        <div className="dashboard-container">

        <h2>Dashboard</h2>
        <p>Welcome to your dashboard! This is a protected area.</p>
        {/* Add your dashboard content here */}
        </div>

    </>

  );
};

export default Dashboard;
