import React, { useContext, useState } from 'react'
import { ExpensesContext } from '../context/ExpensesContext';
import { Toaster , toast} from 'react-hot-toast';

const BudgetComponent = () => {
 
  const {expenses, budget, setBudget} = useContext(ExpensesContext);

  const [activeTab, setActiveTab] = useState('settings');
  const [newBudget, setNewBudget] = useState('');
  const [budgetPeriod, setBudgetPeriod] = useState('weekly')

  

  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  const remainingBudget = budget - totalSpent;
  const percentUsed = budget > 0 ? Math.round((totalSpent / budget ) * 100): 0;


  const handleBudget = () =>{
    if(!newBudget || isNaN(Number(newBudget))) return;
    setBudget(Number(newBudget));
    setNewBudget('');
  }

  const progressColor = percentUsed < 50 ? 'bg-green-500' : percentUsed < 80 ? 'bg-yellow-500' : 'bg-red-500';

  const textProgressColor = percentUsed < 50 ? 'text-green-600' : percentUsed < 80 ? 'text-yellow-500' : 'text-red-500'

  const handleSubmit = (e)=>{
     e.preventDefault();
     toast.success('Budget Added successfully!')
  }

  return (
    <div className='flex flex-col items-center mt-8'>
      <h1 className='font-bold text-3xl'>Budget</h1>
      <div className='w-2/4 bg-[#272626] flex justify-around p-1 rounded-xl mt-5'>
        <button onClick={() => setActiveTab('settings')} className={`cursor-pointer rounded-md w-1/2 p-2 ${activeTab === 'settings' ? 'bg-black' : ''}`}>Button Settings</button>
        <button onClick={() => setActiveTab('summary')} className={`cursor-pointer rounded-md w-1/2 p-2 ${activeTab === 'summary' ? 'bg-black' : ''}`}>Button Summary</button>
      </div>

      {activeTab === 'settings' && (
             <div className='w-2/4 bg-[#272626] flex flex-col justify-around p-4 rounded-xl mt-8'>
              <Toaster position='top-center'/>
              <form onSubmit={handleSubmit} className='flex flex-col'>
             <label className='mt-3 font-bold mb-2'>Budget Amount</label>
             <input value={newBudget} onChange={(e) => {setNewBudget(e.target.value)}} type='number' placeholder='$ 0.00' min={0} step='0.01' className='p-2 bg-[#504e4e] rounded-md'/>
             <label className='mt-3 font-bold mb-2'>Budget Period</label>
             <select className='p-2 bg-[#504e4e] rounded-md cursor-pointer' value={budgetPeriod} onChange={(e) => setBudgetPeriod(e.target.value)}> 
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
             </select>
             <button onClick={handleBudget} className='mt-5 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white cursor-pointer'>Save</button>
             </form>
          </div>
      )}

      {activeTab === 'summary' && (
            <div className='w-2/4 bg-[#272626] flex flex-col justify-around p-4 rounded-xl mt-6'>
            <div className='flex justify-between items-center'>
              <h3 className='font-bold text-xl'>Budget Summary</h3>
              <p>Monthly</p>
            </div>
            <div className='flex gap-3 justify-between mt-3'>
               <div className='bg-[#dad5d5] text-black p-3 rounded-xl w-1/2'>
                  <h2>Total Budget</h2>
                  <p>${budget}</p>
               </div>
               <div className='bg-[#dad5d5] text-black p-3 rounded-xl w-1/2'>
                  <h2>Spent so far</h2>
                  <p>${totalSpent}</p>
               </div>
            </div>
            <div className=' mt-3'>
              <div className='flex justify-between'>
                 <h4 className='font-bold'>Budget Used</h4>
                 <p className={textProgressColor}>{percentUsed}% used</p>
              </div>
              <div className='w-full h-2 bg-[#c4bdbd] mt-2 rounded-xl'>
                <div style={{width: `${percentUsed}%`}} 
                className={`h-full ${progressColor} rounded-xl transition-all duration-300`}
                ></div>
              </div>
            </div>
            <div className='mt-3 bg-[#dad5d5] text-black p-3 rounded-xl'>
              <h2 className={textProgressColor}>Remaining: ${remainingBudget}</h2>
              <p className={textProgressColor}>{remainingBudget >= 0 ? 'You are on track with your budget' : "You've exceeded your budget"}</p>
            </div>
            <button className='mt-5 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white cursor-pointer'>Reset</button>
          </div>
           
      )}
      
    </div>
  )
}

export default BudgetComponent


















































// import React, { useState, useEffect } from 'react';

// const BudgetComponent = () => {
//   const [budget, setBudget] = useState(0);
//   const [totalSpent, setTotalSpent] = useState(0);
//   const [newBudget, setNewBudget] = useState('');
//   const [budgetPeriod, setBudgetPeriod] = useState('Monthly');
//   const [activeTab, setActiveTab] = useState('settings');

//   // Dummy data for now — replace with real expenses later
//   useEffect(() => {
//     const expenses = [50, 100, 25]; // Example: replace this with your actual expense data
//     const total = expenses.reduce((acc, val) => acc + val, 0);
//     setTotalSpent(total);
//   }, []);

//   const handleSetBudget = () => {
//     if (!newBudget || isNaN(Number(newBudget))) return;
//     setBudget(Number(newBudget));
//     setNewBudget('');
//   };

//   const handleReset = () => {
//     setBudget(0);
//     setTotalSpent(0);
//   };

//   const percentageUsed = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;

//   // Set color of progress bar based on percentage
//   const getBarColor = () => {
//     if (percentageUsed >= 100) return 'bg-red-500';
//     if (percentageUsed >= 75) return 'bg-yellow-400';
//     return 'bg-green-400';
//   };

//   return (
//     <div >
//       <h2 className="text-3xl font-bold mb-4 text-center mt-8">Budget Tracker 🧾</h2>
//       {/* Toggle Tabs */}
//       <div className="flex justify-between mb-6 bg-zinc-800 p-1 rounded-md max-w-xl mx-auto mt-3">
//         <button
//           onClick={() => setActiveTab('settings')}
//           className={`w-1/2 py-2 rounded-md ${
//             activeTab === 'settings' ? 'bg-purple-600' : 'bg-transparent'
//           }`}
//         > 
//           Budget Settings
//         </button>
//         <button
//           onClick={() => setActiveTab('summary')}
//           className={`w-1/2 py-2 rounded-md ${
//             activeTab === 'summary' ? 'bg-purple-600' : 'bg-transparent'
//           }`}
//         >
//           Budget Summary
//         </button>
//       </div>
//       <div className="max-w-xl mx-auto p-4 bg-zinc-900  rounded-lg shadow-md mt-8">
      
      

//       {/* SETTINGS TAB */}
//       {activeTab === 'settings' && (
//         <div className="bg-black p-4 rounded-md border border-purple-300 ">
//           <label className="block mb-2 text-sm">Set Budget</label>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="number"
//               value={newBudget}
//               onChange={(e) => setNewBudget(e.target.value)}
//               placeholder="Enter amount e.g. 500"
//               className="w-full p-2 rounded-md bg-zinc-800 border border-purple-200 focus:outline-none"
              
//             />
//             <select
//               value={budgetPeriod}
//               onChange={(e) => setBudgetPeriod(e.target.value)}
//               className="w-full sm:w-auto p-2 rounded-md bg-zinc-800 border border-purple-200 text-white"
//             >
//               <option value="Weekly">Weekly</option>
//               <option value="Monthly">Monthly</option>
//               <option value="Yearly">Yearly</option>
//             </select>
//             <button
//               onClick={handleSetBudget}
//               className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white transition"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* SUMMARY TAB */}
//       {activeTab === 'summary' && (
//         <div>
//           <div className="mb-4">
//             <p className="mb-1">
//               <span className="text-gray-300">Budget ({budgetPeriod}):</span>{' '}
//               <span className="font-semibold text-green-400">${budget}</span>
//             </p>
//             <p className="mb-1">
//               <span className="text-gray-300">Total Spent:</span>{' '}
//               <span className="font-semibold text-red-400">${totalSpent}</span>
//             </p>
//             <p>
//               <span className="text-gray-300">Remaining:</span>{' '}
//               <span className="font-semibold text-yellow-300">
//                 ${budget - totalSpent}
//               </span>
//             </p>
//           </div>

//           <div className="w-full bg-zinc-800 h-4 rounded-md overflow-hidden mb-4">
//             <div
//               className={`h-full transition-all duration-300 ${getBarColor()}`}
//               style={{ width: `${percentageUsed}%` }}
//             ></div>
//           </div>

//           <button
//             onClick={handleReset}
//             className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
//           >
//             Reset
//           </button>
//         </div>
//       )}
//       </div>
//     </div>
  

//   );
// };

// export default BudgetComponent;
