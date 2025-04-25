import React, { useContext } from 'react'
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import { ExpensesContext } from '../context/ExpensesContext';

const AllExpensesComponent = () => {

    const {expenses, deleteExpense} = useContext(ExpensesContext);

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);

    const firstExpenseDate = expenses.length > 0 ? new Date(expenses[0].date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }) : null;

  return (
    <div>
        <div className='flex mt-4 justify-between p-2 px-5'>
           <h1 className='font-bold text-3xl'>All Expenses</h1>
           <p>Total: <span>${totalExpenses}</span></p>
        </div>
        <div className='bg-[#272626] rounded-xl mt-4 p-8'>
            {firstExpenseDate ? <h2 className='font-bold text-2xl'>{firstExpenseDate}</h2> : '' }
            
            {expenses.length === 0 ? (
                <p className='text-white'>No Expenses Added Yet</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} className='bg-white text-[#2e2c2c] rounded-xl p-5 flex justify-between items-center mt-2'>
                    <div className='flex gap-2 items-center'>
                     <MdFastfood />
                     <div className=''>
                        <h2 className='text-2xl font-bold'>{expense.title}</h2>
                        <div className='flex gap-3 items-center'>
                            <p>{new Date(expense.date).toLocaleDateString('en-US',{
                                 year: 'numeric',
                                 month: 'short',
                                 day: '2-digit',
                            })}</p>
                            <button className='bg-[#a09c9c] rounded-xl p-1'>{expense.category}</button>
                        </div>
                     </div>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <h3 className='text-2xl font-black'>{expense.amount.toFixed(2)}</h3>
                        <RiDeleteBin7Line className='cursor-pointer' onClick={() => deleteExpense(expense.id)} />
                    </div>
                </div>
                ))
            )}
            
        </div>
      
    </div>
  )
}

export default AllExpensesComponent
