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
      description: 'Exciting news! Our new album is set to release next month. Stay tuned for more updates.',
    },
    {
      id: 2,
      title: 'Upcoming Tour Dates',
      description: 'We will be hitting the road for a worldwide tour starting this summer. Check out our tour schedule!',
    },
  ];

  // Placeholder data for fan spotlight
  const fanSpotlight = [
    {
      id: 1,
      name: 'Fan Name 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ligula et nisi semper pellentesque.',
    },
    {
      id: 2,
      name: 'Fan Name 2',
      description: 'Sed euismod nec sapien nec facilisis. Ut nec dolor sit amet lectus rutrum elementum eget at leo.',
    },
  ];

  // Placeholder data for contests and giveaways
  const contestsAndGiveaways = [
    {
      id: 1,
      title: 'Fan Art Contest',
      description: 'Submit your fan art for a chance to win exclusive merchandise and a shoutout from the band!',
    },
    {
      id: 2,
      title: 'Ticket Giveaway',
      description: 'Enter for a chance to win tickets to our upcoming concert. Don\'t miss out on this opportunity!',
    },
  ];

  // Placeholder data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      date: 'July 15, 2024',
      title: 'World Tour Kickoff Concert',
      location: 'New York City, NY',
    },
    {
      id: 2,
      date: 'August 10, 2024',
      title: 'Fan Meetup and Q&A Session',
      location: 'Los Angeles, CA',
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
