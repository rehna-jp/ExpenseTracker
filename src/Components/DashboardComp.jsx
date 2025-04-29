import React, { useContext } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineSavings } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { ExpensesContext } from '../context/ExpensesContext';
import { BudgetSummary } from './BudgetComponent';
import { delay, motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import DashboardCharts from './DashboardChart';



const DashboardCard = ({ title, value, description, icon ,motionProps}) => {
  return (
    
    <motion.div className='bg-[#222121] w-1/3 p-6 rounded-xl border-[1px] border-violet-400 hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-lg'{...motionProps}>
      <div className='flex items-center justify-between'>
        <h4 className='text-[#b4aeae]'>{title}</h4>
        <div className='text-purple-500 bg-[#3b283b77] p-2 rounded-full'>
          {icon}
        </div>
      </div>
      <h1 className='text-3xl font-bold mt-2'>{value}</h1>
      <p className='text-[#b4aeae]'>{description}</p>
    </motion.div>
    
  )
}

const DashboardComp = () => {

  const { expenses, budget, budgetPeriod } = useContext(ExpensesContext);

  const getRecentExpenses = () => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedExpenses.slice(0, 3);  
  };

  const recentExpenses = getRecentExpenses();

  const getPeriodExpenses = () => {
    const now = new Date();
    // now.setHours(0,0,0,0);

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
    //    expenseDate.setHours(0,0,0,0);

      if (budgetPeriod?.toLowerCase() === 'weekly') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        // startOfWeek.setHours(0,0,0,0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        // endOfWeek.setHours(23, 59, 59, 999);

        return expenseDate >= startOfWeek && expenseDate <= endOfWeek;

      } else if (budgetPeriod?.toLowerCase() === 'monthly') {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      } else if (budgetPeriod?.toLowerCase() === 'yearly') {
        return expenseDate.getFullYear() === now.getFullYear();
      } else {
        return false;
      }
    });
  };


  const periodExpenses = getPeriodExpenses();
  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  const periodSpent = periodExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
  const savingsRate = budget > 0 
      ? (((budget - periodSpent) / budget) * 100).toFixed(0) 
      : 0;

  const currDuration = () => {
    if (budgetPeriod.toLowerCase() === 'weekly') {
      return 'week'
    } else if (budgetPeriod.toLowerCase() === 'monthly') {
      return 'month'
    } else if (budgetPeriod.toLowerCase() === 'yearly') {
      return 'year'
    }
    return 'period';
  }

  return (
    <div className='flex flex-col gap-3 items-center mt-10 p-2'>
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      <div className='flex items-center w-full justify-between gap-3'>
        <DashboardCard 
          title="Total Spent" 
          value={`$${totalSpent.toLocaleString()}`} 
          description="All time expenses" 
          icon={<FaArrowTrendUp />} 
          motionProps={{
            initial: { opacity: 0, y: 0 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: 'easeOut', delay: 0 }
          }}
        />
        <DashboardCard 
          title={`${budgetPeriod || 'Period'} Spent`} 
          value={`$${periodSpent.toLocaleString()}`} 
          description={`Current ${currDuration() || 'period'}`} 
          icon={<FiCalendar />} 
          motionProps={{
            initial: { opacity: 0, y: 0 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: 'easeIn',delay: 0.3 }
          }}
        />
        <DashboardCard 
          title="Savings Rate" 
          value={`${savingsRate}%`} 
          description={`Of ${budgetPeriod} budget`} 
          icon={<MdOutlineSavings />} 
          motionProps={{
            initial: { opacity: 0, y: 0 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: 'easeIn',delay: 0.6 }
          }}
        />
      </div>

      <div className="w-full px-4 md:px-8">
        <DashboardCharts/>
      </div>
      <div className='mt-5 w-full flex gap-3'>
        
        <div className='w-1/2 p-3'>
            <div className='flex justify-between items-center'>
              <h2 className='font-bold text-2xl'>Recent Expenses</h2>
              <Link to='/expenses' className='text-purple-500 flex items-center gap-3'>View all <FaArrowRight /></Link>
            </div>
            <div className="flex flex-col gap-4 mt-4">
    {recentExpenses.length > 0 ? (
      recentExpenses.map((expense) => (
        <div 
          key={expense.id} 
          className="bg-[#222121] p-4 rounded-xl border-[1px] border-violet-400 hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{expense.title}</h3>
              <p className="text-[#b4aeae] text-sm">{new Date(expense.date).toLocaleString('default', {
                  day: 'numeric', month: 'short', year: 'numeric'
               })}</p>
            </div>
            <div className="font-bold text-purple-400">
              ${Number(expense.amount).toLocaleString()}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-[#b4aeae] mt-4">No expenses yet.</p>
    )}
  </div>
        </div>
        <BudgetSummary className='w-1/2 '/>
      </div>
      
    </div>
  )
}

export default DashboardComp;


