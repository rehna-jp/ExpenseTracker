import React,{useContext, useState} from 'react'
import { ExpensesContext } from '../context/ExpensesContext';
import { toast, Toaster } from 'react-hot-toast';

const AddExpenseComponent = () => {
    
    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    const {expenses, setExpenses} = useContext(ExpensesContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(getToday());
    const [category, setCategory] = useState("");
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        toast.success('Expense added successfully!');
    }

    const handleAddExpense = () => {
        if(!title || !amount || !date || !category) return;

        const newExpense = {
            id : Date.now(),
            title,
            amount: parseFloat(amount),
            category,
            date
        }
        setExpenses([...expenses, newExpense]);

        setTitle('');
        setAmount('');
        setCategory('');
        setDate(getToday())
    }

  return (
    <div className='flex flex-col  items-center gap-2 mt-2'>
        <h1 className='text-3xl font-bold'>Add Expense</h1>
        <div className='flex flex-col bg-[#272626] w-1/3 p-5 rounded-md border-1 border-purple-200'>
        <Toaster position='top-center'/>
        <form onSubmit={handleSubmit} className='flex flex-col '>
            <label>Expense Title</label><br/>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='what did you spend on?' className='w-full bg-black p-2 rounded-md border-1 border-purple-200'/><br/>
            <label>Amount</label><br/>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type='number' placeholder='$ 0.00' min={0} step="0.01" className='w-full bg-black p-2 rounded-md border-1 border-purple-200'/><br/>
            <label>Date</label><br/>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='w-full bg-black p-2 rounded-md border-1 border-purple-200'/><br/>
            <label>Category</label><br/>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full bg-black p-2 rounded-md  border-1 border-purple-200'>
                <option value='' hidden>Select a Category</option>
                <option value='Food'>Food</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Utilities'>Utilities</option>
                <option value='Transport'>Transport</option>
                <option value='Other'>Other</option>
            </select><br/>
            <button onClick={handleAddExpense} className='w-full bg-purple-500 not-only-of-type: p-2 rounded-md'>Add Expense</button>
        </form>
        </div>
      
    </div>
  )
}

export default AddExpenseComponent
