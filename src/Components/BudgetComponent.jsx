import React, { useContext, useState } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';
import { Toaster, toast } from 'react-hot-toast';
import { FaArrowTrendDown } from "react-icons/fa6";

// Budget Summary Component
export const BudgetSummary = () => {
  const { expenses, budget, setBudget, budgetPeriod, setBudgetPeriod } = useContext(ExpensesContext);

  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  const remainingBudget = budget - totalSpent;
  const percentUsed = budget > 0 ? Math.round((totalSpent / budget) * 100) : 0;

  const [showModal, setShowModal] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState('');
  const [updatedPeriod, setUpdatedPeriod] = useState(budgetPeriod || '');

  const progressColor = percentUsed < 50 ? 'bg-green-500' : percentUsed < 80 ? 'bg-yellow-500' : 'bg-red-500';
  const textProgressColor = percentUsed < 50 ? 'text-green-600' : percentUsed < 80 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className='w-full max-w-2xl bg-[#272626] flex flex-col justify-around p-4 rounded-xl mt-6'>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold text-xl'>Budget Summary</h3>
        <p>{budgetPeriod}</p>
      </div>
      <div className='flex flex-col md:flex-row gap-3 justify-between mt-3'>
        <div className='bg-[#dad5d5] text-black p-3 rounded-xl w-full md:w-1/2'>
          <h2>Total Budget</h2>
          <p>${budget}</p>
        </div>
        <div className='bg-[#dad5d5] text-black p-3 rounded-xl w-full md:w-1/2'>
          <h2>Spent so far</h2>
          <p>${totalSpent}</p>
        </div>
      </div>
      <div className='mt-3'>
        <div className='flex justify-between'>
          <h4 className='font-bold'>Budget Used</h4>
          <p className={textProgressColor}>{percentUsed}% used</p>
        </div>
        <div className='w-full h-2 bg-[#c4bdbd] mt-2 rounded-xl'>
          <div style={{ width: `${percentUsed}%` }}
            className={`h-full ${progressColor} rounded-xl transition-all duration-300`}
          ></div>
        </div>
      </div>
      <div className='mt-3 bg-[#dad5d5] text-black p-3 rounded-xl flex items-center gap-3'>
        <div className={textProgressColor}>
          <FaArrowTrendDown />
        </div>
        <div>
          <h2 className={textProgressColor}>Remaining: ${remainingBudget}</h2>
          <p className={textProgressColor}>{remainingBudget >= 0 ? 'You are on track with your budget' : "You've exceeded your budget"}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/200 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-black rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-500">Update Budget</h2>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={updatedBudget}
                onChange={(e) => setUpdatedBudget(e.target.value)}
                placeholder="Enter new budget"
                className="p-2 border border-gray-300 rounded-md"
              />

              <select
                value={updatedPeriod}
                onChange={(e) => setUpdatedPeriod(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-black text-white"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>

              <div className="flex gap-4 mt-4 justify-center">
                <button
                  onClick={() => {
                    if (!updatedBudget || isNaN(Number(updatedBudget)) || Number(updatedBudget) <= 0 || !updatedPeriod) {
                      toast.error('Please enter valid budget and select a period!');
                      return;
                    }
                    setBudget(Number(updatedBudget));
                    setBudgetPeriod(updatedPeriod);
                    setUpdatedBudget('');
                    setUpdatedPeriod('');
                    setShowModal(false);
                    toast.success('Budget and period updated successfully!');
                  }}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white w-1/2 cursor-pointer"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setUpdatedBudget('');
                    setUpdatedPeriod(budgetPeriod);
                  }}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white w-1/2 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className='mt-5 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white cursor-pointer'>
        Update Budget
      </button>
    </div>
  );
};


// Main Budget Component
const BudgetComponent = () => {
  const { budget, setBudget, setBudgetPeriod } = useContext(ExpensesContext);

  const [activeTab, setActiveTab] = useState('settings');
  const [newBudget, setNewBudget] = useState('');
  const [budgetPeriod, setNewPeriod] = useState('weekly');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBudget || isNaN(Number(newBudget)) || Number(newBudget) <= 0) {
      toast.error('Please enter a valid budget amount!');
      return;
    }
    setBudget(Number(newBudget));
    setBudgetPeriod(budgetPeriod);
    setNewBudget('');
    toast.success('Budget Added successfully!');
  };

  return (
    <div className='flex flex-col items-center mt-8 px-4'>
      <h1 className='font-bold text-3xl'>Budget</h1>
      <div className='w-full max-w-md bg-[#272626] flex justify-around p-1 rounded-xl mt-5'>
        <button onClick={() => setActiveTab('settings')} className={`cursor-pointer rounded-md w-1/2 p-2 ${activeTab === 'settings' ? 'bg-black' : ''}`}>Budget Settings</button>
        <button onClick={() => setActiveTab('summary')} className={`cursor-pointer rounded-md w-1/2 p-2 ${activeTab === 'summary' ? 'bg-black' : ''}`}>Budget Summary</button>
      </div>

      <Toaster position='top-center' />

      {activeTab === 'settings' && (
        <div className='w-full max-w-md bg-[#272626] flex flex-col justify-around p-4 rounded-xl mt-8'>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className='mt-3 font-bold mb-2'>Budget Amount</label>
            <input
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              type='number'
              placeholder='$ 0.00'
              min={0}
              step='0.01'
              className='p-2 bg-[#504e4e] rounded-md'
            />
            <label className='mt-3 font-bold mb-2'>Budget Period</label>
            <select
              className='p-2 bg-[#504e4e] rounded-md cursor-pointer'
              value={budgetPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
            >
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select>
            <button type='submit' className='mt-5 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white cursor-pointer'>
              Save
            </button>
          </form>
        </div>
      )}

      {activeTab === 'summary' && <BudgetSummary />}
    </div>
  );
};

export default BudgetComponent;
