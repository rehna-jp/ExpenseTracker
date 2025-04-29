import React, { useContext } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { ExpensesContext } from '../context/ExpensesContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const DashboardCharts = () => {
  const { expenses } = useContext(ExpensesContext);

  // Group by category
  const categoryData = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Group by month
  const months = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025',
    'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025',
  ];

  const monthlyTotals = expenses.reduce((acc, { date, amount }) => {
    const key = new Date(date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
    acc[key] = (acc[key] || 0) + Number(amount);
    return acc;
  }, {});

  const barData = months.map(month => ({
    month,
    amount: monthlyTotals[month] || 0,
  }));

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Analytics Overview
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Pie Chart */}
        <div className="bg-[#222121] p-6 rounded-2xl w-full md:w-1/2 shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4">Spending by Category</h3>
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
                {pieData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#222121] p-6 rounded-2xl w-full md:w-1/2 shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4">Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="amount" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
