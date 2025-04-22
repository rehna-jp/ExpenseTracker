import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black/10 flex justify-between px-9 py-5  items-center border-b-1 border-purple-300 sticky shadow-md backdrop-blur-2xl z-50 top-0 w-full '>
      <h1 className='text-3xl text-purple-500 font-bold'>Velvo</h1>
      <div>
        <ul className='flex gap-7 items-center *:hover:font-medium hover:scale-100 transition-transform duration-300 *:cursor-pointer'>
            <NavLink to="/" className={({isActive}) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold ' : ''}>Home</NavLink>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold scale-100' : ''}>Dashboard</NavLink>
            <NavLink to="/expenses" className={({isActive}) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold scale-100' : ''}>Expenses</NavLink>
            <NavLink to="/budget" className={({isActive}) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold scale-100' : ''}>Budget</NavLink>
            <NavLink to="/add-expense" className='bg-purple-500 px-4 py-2 rounded-3xl '>Add Expense</NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
