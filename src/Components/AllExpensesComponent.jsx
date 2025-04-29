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

  const totalExpenses = expenses
    .reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateKey = formatDateKey(expense.date);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(expense);
    return acc;
  }, {});

  return (
    <div className="px-4 md:px-8 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold">All Expenses</h1>
        <p className="text-md md:text-lg font-semibold">
          Total: <span className="text-purple-400">${totalExpenses}</span>
        </p>
      </div>

      <div className="bg-[#272626] rounded-xl mt-4 p-4 md:p-8 w-full">
        {Object.keys(groupedExpenses).length === 0 ? (
          <p className="text-white">No Expenses Added Yet</p>
        ) : (
          Object.entries(groupedExpenses).map(([date, expenseGroup]) => (
            <div key={date} className="mb-6">
              <h2 className="text-[#d1ceceaf] font-bold text-xl md:text-2xl mb-3">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </h2>

              {expenseGroup.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white text-[#2e2c2c] rounded-xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3"
                >
                  <div className="flex gap-3 items-center w-full sm:w-auto">
                    <div className="text-purple-500 text-2xl bg-black rounded-full p-3">
                      {categoryIcons[expense.category] || <MdFastfood />}
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">{expense.title}</h2>
                      <div className="flex gap-2 items-center mt-1 flex-wrap">
                        <p className="text-sm text-gray-600">
                          {new Date(expense.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          })}
                        </p>
                        <span className="bg-[#dfd9d9] text-xs px-2 py-1 rounded-xl">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                    <h3 className="text-xl md:text-2xl font-black">
                      ${expense.amount.toFixed(2)}
                    </h3>
                    <RiDeleteBin7Line
                      className="text-red-500 cursor-pointer text-xl"
                      onClick={() => deleteExpense(expense.id)}
                      title="Delete expense"
                    />
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
