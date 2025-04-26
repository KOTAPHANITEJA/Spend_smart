import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    const aiResponse = generateAIResponse(input);
    setMessages([...messages, userMessage, aiResponse]);

    setInput('');
  };

  const generateAIResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    let responseText = '';

    // Financial advice responses
    if (lowercaseInput.includes('stock') || lowercaseInput.includes('market')) {
      responseText = `Stock Market Investment Tips:
      1. Research before investing
      2. Diversify your portfolio
      3. Start with blue-chip stocks
      4. Monitor market trends
      5. Use stop-loss orders
      6. Understand company financials
      7. Consider long-term investing
      8. Follow market news regularly`;
    }
    else if (lowercaseInput.includes('crypto') || lowercaseInput.includes('bitcoin')) {
      responseText = `Cryptocurrency Investment Advice:
      1. Research thoroughly
      2. Start with established cryptocurrencies
      3. Use secure wallets
      4. Understand blockchain technology
      5. Don't invest more than you can lose
      6. Stay updated with regulations
      7. Be aware of market volatility
      8. Consider dollar-cost averaging`;
    }
    else if (lowercaseInput.includes('save') || lowercaseInput.includes('saving')) {
      responseText = `Smart Saving Strategies:
      1. Follow the 50/30/20 rule
      2. Set up automatic savings
      3. Cut unnecessary expenses
      4. Save 20% of monthly income
      5. Create an emergency fund
      6. Use high-yield savings accounts
      7. Track your savings progress
      8. Set specific saving goals`;
    }
    else if (lowercaseInput.includes('invest') || lowercaseInput.includes('investment')) {
      responseText = `Investment Guidelines:
      1. Start with mutual funds
      2. Consider low-risk bonds
      3. Explore stock market basics
      4. Diversify your portfolio
      5. Consult a financial advisor
      6. Understand risk tolerance
      7. Research investment options
      8. Monitor performance regularly`;
    }
    else if (lowercaseInput.includes('budget') || lowercaseInput.includes('budgeting')) {
      responseText = `Effective Budgeting Tips:
      1. Track all expenses
      2. Categorize your spending
      3. Set realistic limits
      4. Review monthly expenses
      5. Use our expense tracker
      6. Plan for irregular expenses
      7. Include savings in budget
      8. Adjust budget as needed`;
    }
    else if (lowercaseInput.includes('debt') || lowercaseInput.includes('loan')) {
      responseText = `Debt Management Strategy:
      1. Prioritize high-interest debt
      2. Consider debt consolidation
      3. Make more than minimum payments
      4. Avoid new debt
      5. Create a repayment plan
      6. Negotiate interest rates
      7. Build emergency savings
      8. Monitor credit score`;
    }
    else if (lowercaseInput.includes('expense') || lowercaseInput.includes('spend')) {
      responseText = `Expense Control Tips:
      1. Track daily expenses
      2. Use category limits
      3. Review spending patterns
      4. Identify areas to cut
      5. Set monthly goals
      6. Use cash for discretionary spending
      7. Wait before large purchases
      8. Compare prices before buying`;
    }
    else if (lowercaseInput.includes('retirement') || lowercaseInput.includes('pension')) {
      responseText = `Retirement Planning Advice:
      1. Start saving early
      2. Maximize employer contributions
      3. Diversify retirement accounts
      4. Consider inflation impact
      5. Plan healthcare costs
      6. Review retirement goals
      7. Adjust strategy periodically
      8. Consider tax implications`;
    }
    else if (lowercaseInput.includes('tax') || lowercaseInput.includes('taxes')) {
      responseText = `Tax Management Tips:
      1. Keep proper documentation
      2. Know your deductions
      3. Plan investments for tax benefits
      4. Consider tax-saving instruments
      5. Consult a tax professional
      6. Plan for tax payments
      7. Understand tax brackets
      8. Track tax-deductible expenses`;
    }
    else if (lowercaseInput.includes('insurance')) {
      responseText = `Insurance Planning:
      1. Get adequate health coverage
      2. Consider life insurance
      3. Review policies annually
      4. Compare insurance rates
      5. Don't over-insure
      6. Understand policy terms
      7. Keep beneficiaries updated
      8. Consider disability insurance`;
    }
    else if (lowercaseInput.includes('credit') || lowercaseInput.includes('score')) {
      responseText = `Credit Score Improvement:
      1. Pay bills on time
      2. Keep utilization low
      3. Monitor credit report
      4. Limit new applications
      5. Keep old accounts active
      6. Dispute errors promptly
      7. Mix credit types
      8. Build credit history`;
    }
    else if (lowercaseInput.includes('real estate') || lowercaseInput.includes('property')) {
      responseText = `Real Estate Investment Tips:
      1. Research the market
      2. Consider location carefully
      3. Calculate all costs
      4. Get proper insurance
      5. Understand tax implications
      6. Build emergency funds
      7. Plan for maintenance
      8. Consider rental income`;
    }
    else if (lowercaseInput.includes('help') || lowercaseInput.includes('features')) {
      responseText = `I can help you with:
      1. Investment strategies
      2. Budgeting advice
      3. Saving tips
      4. Debt management
      5. Tax planning
      6. Insurance guidance
      7. Retirement planning
      8. Real estate advice`;
    }
    else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      responseText = "Hello! I'm your financial assistant. How can I help you today? You can ask me about saving, investing, budgeting, or any other financial topics.";
    }
    else {
      responseText = "I'm here to help with financial advice. You can ask about saving, investing, budgeting, expenses, debt management, retirement planning, insurance, taxes, real estate, or any other financial topics.";
    }

    return { text: responseText, sender: 'ai' };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="chatbot-message ai">
            Hi! I'm your financial assistant. How can I help you today? You can ask me about saving, investing, budgeting, or any other financial topics.
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about saving, investing, budgeting..."
          className="chatbot-input-field"
        />
        <button onClick={handleSend} className="medium-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;