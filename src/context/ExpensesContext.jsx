import React, {createContext, useState, useEffect} from 'react';

export const ExpensesContext = createContext();

export const ExpensesProvider = ({children}) => {
    const [expenses, setExpenses] = useState(() => {
        const storedExpenses = localStorage.getItem('expenses');
         return storedExpenses ? JSON.parse(storedExpenses) : [];
    });

    const [budget, setBudget] = useState(() => {
        const storedBudget = localStorage.getItem('budget');
        return storedBudget ? JSON.parse(storedBudget) : 0;
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    },[budget])
    
    const deleteExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expenses => expenses.id !== id))
    }
    return(
        <ExpensesContext.Provider value={{expenses, setExpenses, budget , setBudget}}>
            {children}
        </ExpensesContext.Provider>
    )
}