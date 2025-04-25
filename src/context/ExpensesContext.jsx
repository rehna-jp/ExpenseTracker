import React, {createContext, useState, useEffect} from 'react';

export const ExpensesContext = createContext();

export const ExpensesProvider = ({children}) => {
    const [expenses, setExpenses] = useState(() => {
        const storedExpenses = localStorage.getItem('expenses');
         return storedExpenses ? JSON.parse(storedExpenses) : [];
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);
    
    const deleteExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expenses => expenses.id !== id))
    }
    return(
        <ExpensesContext.Provider value={{expenses, setExpenses}}>
            {children}
        </ExpensesContext.Provider>
    )
}