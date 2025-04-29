import React, { useContext } from 'react'
import { LuWallet } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { Link } from 'react-router-dom'
import { ExpensesContext } from '../context/ExpensesContext';

const HomeComponent = () => {

  const {expenses, budget} = useContext(ExpensesContext);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalSpent = monthlyExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
  const currentBudget = budget || 0;
  const remaining = currentBudget - totalSpent;

  return (
    <div className='bg-[#141313] border w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto my-10 rounded-md py-7 text-center flex flex-col items-center gap-5 border-none px-4'>
      <h1 className='text-4xl md:text-5xl text-purple-500 font-bold'>Velvo</h1>
      <h3 className='text-lg md:text-xl font-medium text-white'>Your Personal Expense Tracker</h3>

      <div className='flex flex-col gap-2 bg-[#3a3737] py-4 px-5 rounded-md w-full'>
        <h4 className='font-medium text-white'>This month you've spent</h4>
        <h1 className='text-3xl md:text-4xl font-bold rounded text-white'>${totalSpent.toFixed(2)}</h1>
        <h4 className='font-medium text-white'>You have ${remaining.toFixed(2)} left</h4>
      </div>

      <div className='flex flex-col gap-4 w-full'>
        <Link
          to='/add-expense'
          className='flex justify-center items-center gap-2 bg-purple-500 py-3 rounded-md text-white w-full'
        >
          <IoMdAdd /> Add Expense
        </Link>
        <Link
          to='/budget'
          className='flex justify-center items-center gap-2 py-3 bg-black rounded-md border border-purple-400 text-white w-full'
        >
          <LuWallet /> View Budget
        </Link>
        <Link
          to='/dashboard'
          className='flex justify-center items-center gap-2 py-3 bg-black rounded-md border border-purple-400 text-white w-full'
        >
          <GoGraph /> View Reports
        </Link>
      </div>
    </div>
  )
}

export default HomeComponent
