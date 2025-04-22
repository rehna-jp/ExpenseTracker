import React, { useState, useEffect } from 'react';

const BudgetComponent = () => {
  const [budget, setBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [newBudget, setNewBudget] = useState('');
  const [budgetPeriod, setBudgetPeriod] = useState('Monthly');
  const [activeTab, setActiveTab] = useState('settings');

  // Dummy data for now — replace with real expenses later
  useEffect(() => {
    const expenses = [50, 100, 25]; // Example: replace this with your actual expense data
    const total = expenses.reduce((acc, val) => acc + val, 0);
    setTotalSpent(total);
  }, []);

  const handleSetBudget = () => {
    if (!newBudget || isNaN(Number(newBudget))) return;
    setBudget(Number(newBudget));
    setNewBudget('');
  };

  const handleReset = () => {
    setBudget(0);
    setTotalSpent(0);
  };

  const percentageUsed = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;

  // Set color of progress bar based on percentage
  const getBarColor = () => {
    if (percentageUsed >= 100) return 'bg-red-500';
    if (percentageUsed >= 75) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  return (
    <div >
      <h2 className="text-3xl font-bold mb-4 text-center mt-8">Budget Tracker 🧾</h2>
      {/* Toggle Tabs */}
      <div className="flex justify-between mb-6 bg-zinc-800 p-1 rounded-md max-w-xl mx-auto mt-3">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-1/2 py-2 rounded-md ${
            activeTab === 'settings' ? 'bg-purple-600' : 'bg-transparent'
          }`}
        > 
          Budget Settings
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`w-1/2 py-2 rounded-md ${
            activeTab === 'summary' ? 'bg-purple-600' : 'bg-transparent'
          }`}
        >
          Budget Summary
        </button>
      </div>
      <div className="max-w-xl mx-auto p-4 bg-zinc-900  rounded-lg shadow-md mt-8">
      
      

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-black p-4 rounded-md border border-purple-300 ">
          <label className="block mb-2 text-sm">Set Budget</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="Enter amount e.g. 500"
              className="w-full p-2 rounded-md bg-zinc-800 border border-purple-200 focus:outline-none"
            /><br/>
            <select
              value={budgetPeriod}
              onChange={(e) => setBudgetPeriod(e.target.value)}
              className="w-full sm:w-auto p-2 rounded-md bg-zinc-800 border border-purple-200 text-white"
            ><br/>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select><br/>
            <button
              onClick={handleSetBudget}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* SUMMARY TAB */}
      {activeTab === 'summary' && (
        <div>
          <div className="mb-4">
            <p className="mb-1">
              <span className="text-gray-300">Budget ({budgetPeriod}):</span>{' '}
              <span className="font-semibold text-green-400">${budget}</span>
            </p>
            <p className="mb-1">
              <span className="text-gray-300">Total Spent:</span>{' '}
              <span className="font-semibold text-red-400">${totalSpent}</span>
            </p>
            <p>
              <span className="text-gray-300">Remaining:</span>{' '}
              <span className="font-semibold text-yellow-300">
                ${budget - totalSpent}
              </span>
            </p>
          </div>

          <div className="w-full bg-zinc-800 h-4 rounded-md overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-300 ${getBarColor()}`}
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>

          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
          >
            Reset
          </button>
        </div>
      )}
      </div>
    </div>
  

  );
};

export default BudgetComponent;
