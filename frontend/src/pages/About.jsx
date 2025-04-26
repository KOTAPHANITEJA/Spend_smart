import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>About Spend Smart</h1>
        <Link to="/" className="dashboard-button">Back to Home</Link>
      </header>

      <div className="dashboard-content">
        <section style={{ gridColumn: '1 / -1' }}>
          <h2>What is Spend Smart?</h2>
          <p>
            Spend Smart is your personal finance management solution that helps you take control of your spending and achieve your financial goals. With intelligent expense tracking and budgeting features, we make it easy to manage your money smartly.
          </p>

          <h3>Key Features:</h3>
          <ul>
            <li>
              <strong>Expense Tracking:</strong> Easily log and categorize your daily expenses
            </li>
            <li>
              <strong>Smart Budgeting:</strong> Set category-wise spending limits and get alerts when you exceed them
            </li>
            <li>
              <strong>Financial Challenges:</strong> Participate in money-saving challenges to improve your spending habits
            </li>
            <li>
              <strong>Visual Analytics:</strong> View your spending patterns through interactive charts and reports
            </li>
            <li>
              <strong>AI Assistant:</strong> Get personalized financial advice from our chatbot
            </li>
            <li>
              <strong>Monthly Reports:</strong> Track your progress with detailed monthly expense reports
            </li>
          </ul>

          <h3>How It Works:</h3>
          <ol>
            <li>Set your monthly income and EMI</li>
            <li>Add your daily expenses</li>
            <li>Track your spending across different categories</li>
            <li>Get insights and recommendations to improve your financial health</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default About;