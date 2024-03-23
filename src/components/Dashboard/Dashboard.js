import React from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import Subscriptionservice from '../Subscriptionservice/Subscriptionservice';

const Dashboard = () => {
  // Placeholder data for latest updates
  const latestUpdates = [
    {
      id: 1,
      title: 'New Album Announcement',
      description: 'Exciting news! Our new and final album Heaven :x: Hell is set to be released on 29 March 2024 Stay tuned for more updates.',
    },
    {
      id: 2,
      title: 'Ongoing Tour ',
      description: 'Tour of the setting Sum',
    },
  ];

  // Placeholder data for fan spotlight
  const fanSpotlight = [
    {
      id: 1,
      name: 'Emily Johnson',
      description: 'Emily is a dedicated fan of the band, attending every concert and supporting their music on social media. She loves connecting with other fans and sharing her enthusiasm for the band.',
    },
    {
      id: 2,
      name: 'David Martinez',
      description: 'David has been following the band since their early days and has a deep appreciation for their music. He enjoys collecting memorabilia and meeting fellow fans at concerts.',
    },
  ];

  // Placeholder data for contests and giveaways
  const contestsAndGiveaways = [
    {
      id: 1,
      title: 'Fan Art Contest',
      description: 'Fan with a membership subscription can Submit their fan art to contest@fanclub-riserecords.com for a chance to win exclusive merchandise and a shoutout from the band!',
    },
    {
      id: 2,
      title: 'Ticket Giveaway',
      description: 'Enter for a chance to win tickets to our upcoming concert. Don\'t miss out on this opportunity! Subscribe for a membership Plan now',
    },
  ];

  // Placeholder data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      date: 'March 23, 2024',
      title: 'Tour of the setting Sum',
      location: 'Osaka, Japan',
    },
    {
      id: 2,
      date: 'March 29, 2024',
      title: 'Tour of the setting Sum',
      location: 'Ciudad de México, Mexico',
    },
  ];

  return (
    <>
      <div className="dashboard-container">
        <h2>Welcome, [Fan Name]!</h2>
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
