import React, { useContext, useState } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';
import { toast, Toaster } from 'react-hot-toast';

const AddExpenseComponent = () => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getToday());
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Expense added successfully!');
  };

  const handleAddExpense = () => {
    if (!title || !amount || !date || !category) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate(getToday());
  };

  return (
    <div className='flex flex-col items-center gap-2 mt-5 px-4'>
      <h1 className='text-3xl font-bold text-center'>Add Expense</h1>

      
      <div className='flex flex-col bg-[#272626] w-full max-w-xl p-5 rounded-md border border-purple-200'>
        <Toaster position='top-center' />

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label>Expense Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              placeholder='What did you spend on?'
              className='w-full bg-black p-2 mt-1 rounded-md border border-purple-200'
            />
          </div>

          <div>
            <label>Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type='number'
              placeholder='$ 0.00'
              min={0}
              step='0.01'
              className='w-full bg-black p-2 mt-1 rounded-md border border-purple-200'
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full bg-black p-2 mt-1 rounded-md border border-purple-200'
            />
          </div>

          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full bg-black p-2 mt-1 rounded-md border border-purple-200'
            >
              <option value='' hidden>Select a Category</option>
              <option value='Food'>Food</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Utilities'>Utilities</option>
              <option value='Transport'>Transport</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <button
            onClick={handleAddExpense}
            className='w-full bg-purple-500 p-2 rounded-md text-white font-medium hover:bg-purple-600 transition'
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseComponent;
