import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Challenges = () => {
  const { getRemainingAmount } = useContext(ExpenseContext);
  const [failedChallengeMessage, setFailedChallengeMessage] = useState('');
  const [challenges, setChallenges] = useState([
    { id: 1, text: 'Spend less on eating out for a week', category: 'Food', completed: false },
    { id: 2, text: 'Save an extra ₹500 this week on transport', category: 'Transport', completed: false },
    { id: 3, text: 'Track all book expenses for a month', category: 'Books', completed: false },
    { id: 4, text: 'Spend less on clothing for a month', category: 'Clothing', completed: false },
    { id: 5, text: 'Limit electronics purchases this month', category: 'Electronics', completed: false },
    { id: 6, text: 'Spend less on health-related expenses', category: 'Health', completed: false },
    { id: 7, text: 'Reduce beauty expenses for a month', category: 'Beauty', completed: false },
    { id: 8, text: 'Spend less on sports activities', category: 'Sports', completed: false },
    { id: 9, text: 'Save more on education expenses', category: 'Education', completed: false },
    { id: 10, text: 'Reduce miscellaneous expenses', category: 'Others', completed: false },
  ]);

  const handleChallengeCompletion = (id) => {
    const challenge = challenges.find(c => c.id === id);
    const remainingAmount = getRemainingAmount(challenge.category);

    if (remainingAmount < 0) {
      setFailedChallengeMessage(
        `Your challenge "${challenge.text}" has failed because you have exceeded the limit for ${challenge.category}.`
      );
      setTimeout(() => setFailedChallengeMessage(''), 5000);
    } else {
      setChallenges(challenges.map(c => 
        c.id === id ? { ...c, completed: !c.completed } : c
      ));
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Financial Challenges</h1>
      </header>
      <div className="dashboard-content">
        <section className="challenges-section">
          <ul className="challenge-list">
            {challenges.map(challenge => (
              <li key={challenge.id} className="challenge-item">
                <span className="challenge-text">{challenge.text}</span>
                <button
                  onClick={() => handleChallengeCompletion(challenge.id)}
                  className={`medium-button ${challenge.completed ? 'completed' : ''}`}
                >
                  {challenge.completed ? 'Completed' : 'Mark as Complete'}
                </button>
              </li>
            ))}
          </ul>
          {failedChallengeMessage && (
            <div className="failed-challenge-message">
              {failedChallengeMessage}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Challenges;