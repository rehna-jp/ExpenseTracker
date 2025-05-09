import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard' 
import Expenses from './Pages/Expenses'
import Budget from './Pages/Budget'
import AddExpense from './Pages/AddExpense'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className=''>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
