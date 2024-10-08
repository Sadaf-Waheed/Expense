// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// const API_URL = 'http://localhost:5173';

// const App = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [text, setText] = useState('');
//   const [amount, setAmount] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   // Fetch transactions from the backend when component mounts
//   useEffect(() => {
//     fetch('http://localhost:3000/api/expenses')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Fetched data:', data);

//         // Set transactions, balance, income, and expenses from the fetched data
//         setTransactions(data.expenses);  // Assuming expenses is an array
//         setBalance(data.balance);  // Assuming balance is a number
//         setIncome(data.income);    // Assuming income is a number
//         setExpense(data.expenseTotal);  // Assuming expenseTotal is a number
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const API_URL = 'http://localhost:3000/api/expense';  // Correct API URL

// const addTransaction = () => {
//   if (!text || isNaN(amount)) {
//     alert('Please enter valid text and amount');
//     return;
//   }

//   const newTransaction = {
//     description: text,
//     amount: parseFloat(amount),
//     type: parseFloat(amount) > 0 ? 'income' : 'expense',
//   };

//   fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newTransaction),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       setTransactions([...transactions, data]);  // Append new transaction to list
//       setText('');
//       setAmount('');
//     })
//     .catch(error => console.error('Error adding transaction:', error));
// };

//   const handleDelete = (id) => {
//     fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         const updatedTransactions = transactions.filter(transaction => transaction._id !== id);
//         setTransactions(updatedTransactions);
//         // Update balance, income, and expense totals if necessary
//       })
//       .catch(error => console.error('Error deleting transaction:', error));
//   };

//   return (
//     <div className="App">
//       <h2>Expense Tracker</h2>

//       <div className="section">
//         <h2>Your Balance</h2>
//         <p style={{ fontSize: 40, fontWeight: 'bold' }}>Rs: {balance.toFixed(2)}</p>
//       </div>

//       <div className="income-expense-container">
//         <div className="section">
//           <h2>Income</h2>
//           <p style={{ color: 'green' }}>{income.toFixed(2)}</p>
//         </div>

//         <div className="section">
//           <h2>Expense</h2>
//           <p style={{ color: 'red' }}>{expense.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="section">
//         <h2>History</h2>
//         <ul>
//           {transactions.length > 0 ? (
//             transactions.map(transaction => (
//               <li key={transaction._id}>
//                 <button
//                   onClick={() => handleDelete(transaction._id)}
//                   style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
//                 >
//                   <FontAwesomeIcon icon={faTrashAlt} />
//                 </button>
//                 <span>{transaction.description}</span>
//                 <span>{transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}</span>
//               </li>
//             ))
//           ) : (
//             <p>No transactions to show</p>
//           )}
//         </ul>
//       </div>

//       <div className="section">
//         <h2>Add New Transaction</h2>
//         <label>
//           Text:
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Enter text..."
//           />
//         </label>
//         <br />
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount..."
//           />
//         </label>
//         <br />
//         <button onClick={addTransaction}>Add Transaction</button>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import {
//   repositories,
//   repositoryFactory,
// } from "./repository/RepositoryFactory";
import { repositories } from "./repository/RepositoryFactory";

//API URL
const API_URL = "http://localhost:3000/api/expense"; // Correct API URL

const expenses = repositories.expenses;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const getExpenses = async () => {
    const { data } = await expenses.getExpenses();
    setTransactions(data.expenses); // Assuming expenses is an array
    setBalance(data.balance); // Assuming balance is a number
    setIncome(data.income); // Assuming income is a number
    setExpense(data.expenseTotal); // Assuming expenseTotal is a number
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addTransaction = async () => {
  const newTransaction = {
    description: text,
    amount: parseFloat(amount),
    type: parseFloat(amount) > 0 ? "income" : "expense",
  };

  try {
    const response = await expenses.addExpense(newTransaction) // Assuming expense.postExpense is a function that handles the POST request
    setTransactions([...transactions, response.data]); // Append new transaction to list
    setText("");
    setAmount("");
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};


const handleDelete = async (id) => {
  try {
    // Correct repository call here: `expenses.deleteExpense` instead of `expense.deleteExpense`
    await expenses.deleteExpense(id); 
    const updatedTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    );
    setTransactions(updatedTransactions);
    // Optionally, you can re-fetch the expenses if balance, income, and expense totals need to be updated
    await getExpenses();
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};



  return (
    <div className="App">
      <h2>Expense Tracker</h2>

      <div className="section">
        <h2>Your Balance</h2>
        <p style={{ fontSize: 40, fontWeight: "bold" }}>
          Rs: {balance.toFixed(2)}
        </p>
      </div>

      <div className="income-expense-container">
        <div className="section">
          <h2>Income</h2>
          <p style={{ color: "green" }}>{income.toFixed(2)}</p>
        </div>

        <div className="section">
          <h2>Expense</h2>
          <p style={{ color: "red" }}>{expense.toFixed(2)}</p>
        </div>
      </div>

      <div className="section">
        <h2>History</h2>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction._id}>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <span>{transaction.description}</span>
                <span>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toFixed(2)}
                </span>
              </li>
            ))
          ) : (
            <p>No transactions to show</p>
          )}
        </ul>
      </div>

      <div className="section">
        <h2>Add New Transaction</h2>
        <label>
          Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </label>
        <br />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
    </div>
  );
};

export default App;
