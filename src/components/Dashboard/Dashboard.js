import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import Subscriptionservice from '../Subscriptionservice/Subscriptionservice';

const Dashboard = () => {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);

  // Function to get access token from localStorage
  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  useEffect(() => {
    const fetchFullName = async () => {
      const token = getAccessToken();
      console.log('Access Token:', token);  // Debugging
  
      if (!token) {
        setError('No access token found. Please log in.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:8000/auth/get-fullname/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        console.log('Response Status:', response.status);  // Debugging
        if (!response.ok) {
          throw new Error('Failed to fetch full name');
        }
  
        const data = await response.json();
        setFullName(data.fullname);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };
  
    fetchFullName();
  }, []);


  const latestUpdates = [
    { id: 1, title: 'New Album Announcement', description: 'Exciting news! Harry Styles is work on a new album that is to be released soon. Stay tuned for more updates.' },
    { id: 2, title: 'Ongoing Tour', description: 'No ongoing tour for now' },
  ];

  const fanSpotlight = [
    { id: 1, name: 'Emily Johnson', description: 'Emily is a dedicated fan of Harry Styles, attending every concert and supporting his music on social media. She loves connecting with other fans and sharing her enthusiasm for the Artist.' },
    { id: 2, name: 'David Martinez', description: 'David has been following Harry Styles since their early days and has a deep appreciation for his music. He enjoys collecting memorabilia and meeting fellow fans at concerts.' },
  ];

  const contestsAndGiveaways = [
    { id: 1, title: 'Fan Art Contest', description: 'Fans with a membership subscription can submit their fan art to info@hsfanclub-columbiarecords.com for a chance to win exclusive merchandise and a shoutout from the Artist!' },
    { id: 2, title: 'Ticket Giveaway', description: 'Enter for a chance to win tickets to our upcoming concert. Don\'t miss out on this opportunity! Subscribe for a membership plan now.' },
  ];

  const upcomingEvents = [
    { id: 1, date: 'No information yet', title: 'No information yet', location: 'No information yet' },
    { id: 2, date: 'No information yet', title: 'No information yet', location: 'No information yet' },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div className="dashboard-container">
        <h2>Welcome, Fan</h2>
        {/* {error && <p className="error">Error: {error}</p>} */}

        <section className="section">
          <h3>Latest Updates</h3>
          <ul>
            {latestUpdates.map((update) => (
              <li key={update.id}>
                <strong>{update.title}</strong>
                <p>{update.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h3>Fan Spotlight</h3>
          <ul>
            {fanSpotlight.map((fan) => (
              <li key={fan.id}>
                <strong>{fan.name}</strong>
                <p>{fan.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h3>Contests and Giveaways</h3>
          <ul>
            {contestsAndGiveaways.map((contest) => (
              <li key={contest.id}>
                <strong>{contest.title}</strong>
                <p>{contest.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.date}</strong>
                <p>{event.title} - {event.location}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div>
        <Subscriptionservice />
      </div>
    </>
  );
};

export default Dashboard;
