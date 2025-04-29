import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black/10 flex justify-between px-9 py-5 items-center border-b-1 border-purple-300 sticky shadow-md backdrop-blur-2xl z-50 top-0 w-full">
      <h1 className="text-3xl text-purple-500 font-bold">Velvo</h1>
      <div className="hidden md:flex">
        <ul className="flex gap-7 items-center hover:scale-100 transition-transform duration-300">
          <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold' : ''}>Home</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold' : ''}>Dashboard</NavLink>
          <NavLink to="/expenses" className={({ isActive }) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold' : ''}>Expenses</NavLink>
          <NavLink to="/budget" className={({ isActive }) => isActive ? 'border-b-2 border-purple-500 pb-1 font-semibold' : ''}>Budget</NavLink>
          <NavLink to="/add-expense" className='bg-purple-500 px-4 py-2 rounded-3xl '>Add Expense</NavLink>
        </ul>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-3xl text-purple-500" /> : <FaBars className="text-3xl text-purple-500" />}
        </button>
      </div>

      {/* Dropdown Menu (Mobile View) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-black/80 p-5 rounded-xl z-50">
          <ul className="flex flex-col items-center gap-5">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-white font-semibold' : 'text-white'} onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-white font-semibold' : 'text-white'} onClick={toggleMenu}>Dashboard</NavLink>
            <NavLink to="/expenses" className={({ isActive }) => isActive ? 'text-white font-semibold' : 'text-white'} onClick={toggleMenu}>Expenses</NavLink>
            <NavLink to="/budget" className={({ isActive }) => isActive ? 'text-white font-semibold' : 'text-white'} onClick={toggleMenu}>Budget</NavLink>
            <NavLink to="/add-expense" className="bg-purple-500 px-4 py-2 rounded-3xl text-white" onClick={toggleMenu}>Add Expense</NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
