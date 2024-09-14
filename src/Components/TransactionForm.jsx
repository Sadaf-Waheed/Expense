import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const transaction = {
      description,
      amount: parseFloat(amount)
    };

    await axios.post('http://localhost:3000/api/transaction', transaction);

    setDescription('');
    setAmount('');
    onTransactionAdded(); // Notify parent component to refresh the list
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
