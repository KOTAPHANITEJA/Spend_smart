import React, { useContext, useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import { ExpenseContext } from '../context/ExpenseContext';
 import { Pie } from 'react-chartjs-2';
 import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
 import Chatbot from '../components/chatbot';
 
 ChartJS.register(ArcElement, Tooltip, Legend, Title);
 
 const Home = () => {
   const { expenses, getRemainingAmount, income, setIncome, emi, setEmi } = useContext(ExpenseContext);
   const [inputIncome, setInputIncome] = useState(income);
   const [inputEmi, setInputEmi] = useState(emi);
   const [rewards, setRewards] = useState(0);
   const [userName, setUserName] = useState('');
   const [showNameInput, setShowNameInput] = useState(true);
   const [userEmail, setUserEmail] = useState('');
   const [isEditing, setIsEditing] = useState(false);
 
   const categories = [
     'Food', 'Transport', 'Books', 'Clothing', 'Electronics', 
     'Health', 'Beauty', 'Sports', 'Education', 'Others'
   ];
 
   const handleIncomeChange = (e) => setInputIncome(e.target.value);
   const handleEmiChange = (e) => setInputEmi(e.target.value);
 
   const handleIncomeSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch(`http://localhost:5000/api/users/${userEmail}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           income: parseFloat(inputIncome),
           emi: parseFloat(inputEmi)
         })
       });
       const data = await response.json();
       if (data.success) {
         setIncome(parseFloat(inputIncome));
         setEmi(parseFloat(inputEmi));
         alert('Income details updated successfully!');
       } else {
         throw new Error(data.message);
       }
     } catch (error) {
       console.error('Error updating income/EMI:', error);
       alert('Failed to update income details. Please try again.');
     }
   };
 
   const handleNameSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch('http://localhost:5000/api/users', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: userName,
           email: userEmail,
           income: parseFloat(inputIncome),
           emi: parseFloat(inputEmi)
         })
       });
       const data = await response.json();
       if (data.success) {
         setShowNameInput(false);
         setIsEditing(false);
         localStorage.setItem('userEmail', userEmail);
       }
     } catch (error) {
       console.error('Error saving user data:', error);
     }
   };
 
   const handleEditName = () => {
     setIsEditing(true);
   };
 
   useEffect(() => {
     const calculateRewards = () => {
       const totalRewards = categories.reduce((total, category) => {
         const remainingAmount = getRemainingAmount(category);
         return remainingAmount > 0 ? total + (remainingAmount * 0.1) : total;
       }, 0);
       setRewards(totalRewards);
     };
 
     calculateRewards();
   }, [expenses, income, emi, categories, getRemainingAmount]);
 
   useEffect(() => {
     const savedEmail = localStorage.getItem('userEmail');
     if (savedEmail) {
       fetch(`http://localhost:5000/api/users/${savedEmail}`)
         .then(response => response.json())
         .then(data => {
           if (data.success) {
             const { name, income, emi } = data.data;
             setUserName(name);
             setIncome(income);
             setEmi(emi);
             setInputIncome(income);
             setInputEmi(emi);
             setUserEmail(savedEmail);
             setShowNameInput(false);
           }
         })
         .catch(error => console.error('Error fetching user data:', error));
     }
   }, [setIncome, setEmi]);
 
   const overLimitCategories = categories.filter(category => getRemainingAmount(category) < 0);
 
   const expenseData = categories.map(category => {
     return expenses
       .filter(expense => expense.category === category)
       .reduce((total, expense) => total + expense.amount, 0);
   });
 
   const data = {
     labels: categories,
     datasets: [{
       label: 'Expenses',
       data: expenseData,
       backgroundColor: [
         'rgba(244, 5, 57, 0.97)',
         'rgb(0, 153, 255)',
         'rgb(255, 183, 0)',
         'rgb(0, 255, 255)',
         'rgb(85, 0, 255)',
         'rgb(254, 127, 0)',
         'rgb(255, 255, 255)',
         'rgb(0, 30, 255)',
         'rgb(232, 106, 133)',
         'rgb(25, 73, 105)'
       ],
       borderColor: [
         'rgba(255, 99, 132, 1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)',
         'rgba(199, 199, 199, 1)',
         'rgba(83, 102, 255, 1)',
         'rgba(255, 99, 132, 1)',
         'rgba(54, 162, 235, 1)'
       ],
       borderWidth: 1,
     }],
   };
 
   return (
     <div className="dashboard-container">
       <header className="dashboard-header">
         <div>
           <h1>Spend Smart</h1>
           {(showNameInput || isEditing) ? (
             <form onSubmit={handleNameSubmit} className="name-form">
               <input
                 type="text"
                 placeholder="Enter your name"
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}
                 required
               />
               <input
                 type="email"
                 placeholder="Enter your email"
                 value={userEmail}
                 onChange={(e) => setUserEmail(e.target.value)}
                 required
               />
               <button type="submit" className="medium-button">Save</button>
             </form>
           ) : (
             <div className="welcome-message">
               <p>Welcome {userName}! Your Personal Finance Manager</p>
               <button onClick={handleEditName} className="edit-name-button">
                 <span role="img" aria-label="edit">✏️</span>
               </button>
             </div>
           )}
         </div>
         <div className="header-buttons">
           <Link to="/challenges" className="dashboard-button">
             Financial Challenges
           </Link>
           <Link to="/dashboard" className="dashboard-button">
             Add New Expense
           </Link>
           <Link to="/about" className="dashboard-button">
             About Us
           </Link>
         </div>
       </header>
 
       <div className="dashboard-content">
         <section className="income-section">
           <form onSubmit={handleIncomeSubmit} className="income-form">
             <h3>Income Details</h3>
             <label>
               Monthly Income:
               <input type="number" value={inputIncome} onChange={handleIncomeChange} required />
             </label>
             <label>
               Monthly EMI:
               <input type="number" value={inputEmi} onChange={handleEmiChange} required />
             </label>
             <button type="submit" className="medium-button">Update Income & EMI</button>
           </form>
         </section>
 
         <section className="summary-section">
           <div className="summary-cards">
             <div className="summary-card">
               <h3>Total Expenses</h3>
               <p>{expenses.length} transactions</p>
             </div>
             <div className="summary-card">
               <h3>Total Rewards</h3>
               <p>₹{rewards.toFixed(2)}</p>
             </div>
           </div>
         </section>
 
         <section className="expenses-section">
           <h3>Recent Expenses</h3>
           <table>
             <thead>
               <tr>
                 <th>Description</th>
                 <th>Amount</th>
                 <th>Category</th>
                 <th>Date</th>
               </tr>
             </thead>
             <tbody>
               {expenses.map((expense, index) => (
                 <tr key={index}>
                   <td>{expense.description}</td>
                   <td>₹{expense.amount}</td>
                   <td>{expense.category}</td>
                   <td>{new Date(expense.date).toLocaleDateString()}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </section>
 
         <section className="category-limits-section">
           <h3>Category Limits</h3>
           <table>
             <thead>
               <tr>
                 <th>Category</th>
                 <th>Remaining Amount</th>
               </tr>
             </thead>
             <tbody>
               {categories.map((category, index) => (
                 <tr key={index}>
                   <td>{category}</td>
                   <td>₹{getRemainingAmount(category)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
 
           {overLimitCategories.length > 0 && (
  <div 
    className="over-limit-message" 
    style={{
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0',
      border: '1px solid #fecaca',
      animation: 'alertPulse 2s infinite',
      cursor: 'pointer'
    }}
    onClick={() => alert(`Budget Alert!\n\n${overLimitCategories.map(category => 
      `${category} has exceeded its limit by ₹${Math.abs(getRemainingAmount(category))}`
    ).join('\n')}`)}
  >
    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span role="img" aria-label="warning">⚠️</span>
      Budget Alert!
    </h4>
    <ul style={{ marginTop: '0.5rem', listStyle: 'none' }}>
      {overLimitCategories.map((category, index) => (
        <li key={index} style={{ marginTop: '0.25rem' }}>
          {category} has exceeded its limit by ₹{Math.abs(getRemainingAmount(category))}
        </li>
      ))}
    </ul>
  </div>
)}
         </section>
 
         <section className="chart-section">
           <h3>Expense Distribution</h3>
           <div className="chart-container">
             <Pie data={data} options={{
               responsive: true,
               plugins: {
                 legend: { position: 'top' },
                 title: {
                   display: true,
                   text: 'Expenses by Category'
                 }
               }
             }} />
           </div>
         </section>
 
         <section className="chatbot-section">
           <h3>Financial Assistant</h3>
           <Chatbot />
         </section>
       </div>
     </div>
   );
 };
 
 export default Home;