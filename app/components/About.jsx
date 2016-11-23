import React from 'react';

const About = () => {
  return (
    <div>
      <h4>
        A sample project built by <a href="https://github.com/joshuahenson">Joshua Henson</a> for improving development skills using universal React while implementing the following user stories.
      </h4>
      <ul className="list-unstyled">
        <li>User Story: I can view all books posted by every user.</li>
        <li>User Story: I can add a new book.</li>
        <li>User Story: I can update my settings to store my full name, city, and state.</li>
        <li>User Story: I can propose a trade and wait for the other user to accept the trade.</li>
      </ul>

    </div>
  );
};

export default About;
