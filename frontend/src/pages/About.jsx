import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header"style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>About Spend Smart</h1>
        
        <Link to="/" className="dashboard-button">Back to Home</Link>
      </header>

      <div className="dashboard-content">
        <section style={{ gridColumn: '1 / -1', gap: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div className="about-section">
            <h2>What is Spend Smart?</h2>
            <p>
              Spend Smart is your personal finance management solution that helps you take control of your spending and achieve your financial goals. With intelligent expense tracking and budgeting features, we make it easy to manage your money smartly.
            </p>
          </div>

          <div className="features-section">
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
          </div>

          <div className="process-section">
            <h3>How It Works:</h3>
            <ol>
              <li>Set your monthly income and EMI</li>
              <li>Add your daily expenses</li>
              <li>Track your spending across different categories</li>
              <li>Get insights and recommendations to improve your financial health</li>
            </ol>
          </div>

          <div className="benefits-section">
            <h3>Benefits of Using Spend Smart</h3>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h4>Better Financial Awareness</h4>
                <p>Gain clear insights into your spending patterns and habits</p>
              </div>
              <div className="benefit-card">
                <h4>Smart Budgeting</h4>
                <p>Set and manage category-wise budgets effectively</p>
              </div>
              <div className="benefit-card">
                <h4>Goal Achievement</h4>
                <p>Track and accomplish your financial goals with ease</p>
              </div>
              <div className="benefit-card">
                <h4>Informed Decisions</h4>
                <p>Make better financial choices with data-driven insights</p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h3>Get in Touch</h3>
            <p>Have questions or suggestions? We'd love to hear from you!</p>
            <div className="contact-info">
              <p>📧 Email: support@spendsmart.com</p>
              <p>📱 Phone: +91 8341134293</p>
              <p>🌐 Follow us on social media for tips and updates</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;