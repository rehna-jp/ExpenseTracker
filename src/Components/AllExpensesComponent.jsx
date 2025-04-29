import React, { useContext } from 'react';
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import { ExpensesContext } from '../context/ExpensesContext';
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { BsBox } from "react-icons/bs";


const formatDateKey = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0]; 
};

const categoryIcons = {
    Food: <MdFastfood />,
    Entertainment: <BiSolidMoviePlay />,
    Transport: <FaCarSide />,
    Utilities: <GrNotes />,
    Other: <BsBox />,
  };

const AllExpensesComponent = () => {
  const { expenses, deleteExpense } = useContext(ExpensesContext);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);


  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateKey = formatDateKey(expense.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(expense);
    return acc;
  }, {});

  return (
    <div>
      <div className='flex mt-4 justify-between p-2 px-5'>
        <h1 className='font-bold text-3xl'>All Expenses</h1>
        <p>Total: <span>${totalExpenses}</span></p>
      </div>

      <div className='bg-[#272626] rounded-xl mt-4 p-8 '>
        {Object.keys(groupedExpenses).length === 0 ? (
          <p className='text-white'>No Expenses Added Yet</p>
        ) : (
          Object.entries(groupedExpenses).map(([date, expenseGroup]) => (
            <div key={date} className='mb-6'>
              <h2 className='font-bold text-2xl mb-2 text-[#d1ceceaf]'>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </h2>
              {expenseGroup.map((expense) => (
                <div key={expense.id} className='bg-white text-[#2e2c2c] rounded-xl p-5 flex justify-between items-center mt-2'>
                  <div className='flex gap-2 items-center'>
                    <div className='text-purple-500 text-2xl bg-black rounded-full p-2.5'>
                    {categoryIcons[expense.category] || <MdFastfood />}
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold'>{expense.title}</h2>
                      <div className='flex gap-3 items-center'>
                        <p>{new Date(expense.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        })}</p>
                        <button className='bg-[#dfd9d9] rounded-xl p-1'>{expense.category}</button>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 items-center'>
                    <h3 className='text-2xl font-black'>${expense.amount.toFixed(2)}</h3>
                    <RiDeleteBin7Line className='cursor-pointer' onClick={() => deleteExpense(expense.id)} />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllExpensesComponent;
