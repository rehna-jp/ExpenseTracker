import React from 'react'
import { LuWallet } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { GoGraph } from "react-icons/go";

const HomeComponent = () => {
  return (
    <div className='bg-[#141313] border w-1/3 place-self-center m-20 rounded-md py-7 text-center flex flex-col items-center gap-5 border-none'>
      <h1 className='text-5xl text-purple-500 font-bold'>Velvo</h1>
      <h3 className='text-xl font-medium'>Your Personal Expense Tracker</h3>
      <div className='flex flex-col gap-2 bg-[#3a3737] py-3 px-23 rounded-md m-3'>
        <h4 className='font-medium'>This month you've spent</h4>
        <h1 className='text-4xl font-bold rounded'>$0</h1>
        <h4 className='font-medium'>You have $1000 left</h4>
      </div>
      <div className='flex flex-col gap-4'>
        <button className='flex items-center gap-2 bg-purple-500 py-3 px-30 rounded-md'><IoMdAdd/>Add Expense</button>
        <button className='flex items-center gap-2 px-30 py-3 bg-black rounded-md border-1 border-purple-400'><LuWallet/>View Budget</button>
        <button className='flex items-center gap-2 px-30 py-3 bg-black rounded-md border-1 border-purple-400'><GoGraph/>View Reports</button>
      </div>
    </div>
  )
}

export default HomeComponent
