import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ExpensesContext } from '../context/ExpensesContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const DashboardCharts = () => {
  const { expenses } = useContext(ExpensesContext);

  // Group expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const allMonths = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025',
    'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025',
    'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025'
  ];
  // Group expenses by month
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const key = date.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
  
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += Number(expense.amount);
    return acc;
  }, {});
  
  // Fill in all months (even if 0)
  const barData = allMonths.map(month => ({
    month,
    amount: monthlyTotals[month] || 0,
  }));

  return (
    
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Analytics Overview</h2>
          
          <div className="flex flex-col md:flex-row gap-6 w-full">
            
            {/* Pie Chart */}
            <div className="bg-[#222121] p-5 rounded-xl shadow-md w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-white">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={pieData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}

                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
    
            {/* Bar Chart */}
            <div className="bg-[#222121] p-5 rounded-xl shadow-md w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-white">Monthly Spending</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" tickFormatter={(value) => `$${value}`}/>
                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}/>
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
    
          </div>
        </div>
      );
};

export default DashboardCharts;
