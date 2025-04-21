import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black/10 flex justify-between px-9 py-5  items-center border-b-1 border-purple-300 position-fixed z-0 top-0'>
      <h1 className='text-3xl text-purple-500 font-bold'>Velvo</h1>
      <div>
        <ul className='flex gap-7 items-center *:hover:text-purple-500 *:cursor-pointer'>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/add-expense" className='bg-purple-500 px-4 py-2 rounded-3xl'>Add Expense</Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
