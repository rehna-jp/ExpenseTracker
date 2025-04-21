import React,{useState} from 'react'


const AddExpenseComponent = () => {

    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    const [date, setDate] = useState(getToday());

    const [category, setCategory] = useState("")

  return (
    <div className='flex flex-col  items-center'>
        <h1 className='text-3xl font-bold'>Add Expense</h1>
        <div className='flex flex-col bg-[#3a3737] w-1/3 p-5 rounded-md'>
            <label>Expense Title</label><br/>
            <input type='text' placeholder='what did you spend on?' className='w-full bg-black p-2 rounded-md'/><br/>
            <label>Amount</label><br/>
            <input type='number' placeholder='$ 0.00' min={0} step="0.01" className='w-full bg-black p-2 rounded-md'/><br/>
            <label>Date</label><br/>
            
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='w-full bg-black p-2 rounded-md'/><br/>
            <label>Category</label><br/>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full bg-black p-2 rounded-md'>
                <option>Select a Category</option>
                <option>Food</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Transport</option>
                <option>Other</option>
            </select><br/>
            <button className='w-full bg-purple-500 not-only-of-type: p-2 rounded-md'>Add Expense</button>
        </div>
      
    </div>
  )
}

export default AddExpenseComponent
