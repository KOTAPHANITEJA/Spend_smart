import React, { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('income');
    return savedIncome ? parseFloat(savedIncome) : 0;
  });
  const [emi, setEmi] = useState(() => {
    const savedEmi = localStorage.getItem('emi');
    return savedEmi ? parseFloat(savedEmi) : 0;
  });

  // Save income and EMI to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('income', income);
    localStorage.setItem('emi', emi);
  }, [income, emi]);

  // Load user data from MongoDB on initial load
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      fetch(`${API_URL}/api/users/${savedEmail}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const { income: savedIncome, emi: savedEmi } = data.data;
            setIncome(savedIncome || 0);
            setEmi(savedEmi || 0);
            localStorage.setItem('income', savedIncome);
            localStorage.setItem('emi', savedEmi);
          }
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  // Calculate category limits based on income and EMI
  const calculateCategoryLimits = (income, emi) => {
    const remainingIncome = income - emi;
    return {
      Food: remainingIncome * 0.1,
      Transport: remainingIncome * 0.05,
      Books: remainingIncome * 0.05,
      Clothing: remainingIncome * 0.1,
      Electronics: remainingIncome * 0.2,
      Health: remainingIncome * 0.05,
      Beauty: remainingIncome * 0.05,
      Sports: remainingIncome * 0.05,
      Education: remainingIncome * 0.1,
      Others: remainingIncome * 0.05,
    };
  };

  const categoryLimits = calculateCategoryLimits(income, emi);


  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, date: new Date() }]);
  };

  const editExpense = (index) => {
    const updatedExpenses = [...expenses];
    const description = prompt("Enter new description", updatedExpenses[index].description);
    const amount = parseFloat(prompt("Enter new amount", updatedExpenses[index].amount));
    const category = prompt("Enter new category", updatedExpenses[index].category);
    updatedExpenses[index] = { ...updatedExpenses[index], description, amount, category };
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const getRemainingAmount = (category) => {
    const totalSpent = expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
    return categoryLimits[category] - totalSpent;
  };

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      addExpense, 
      editExpense, 
      deleteExpense, 
      getRemainingAmount, 
      income, 
      setIncome, 
      emi, 
      setEmi 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;