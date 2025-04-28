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
    const [budgetPeriod, setBudgetPeriod] = useState(() => {
        const storedBudgetPeriod = localStorage.getItem('budgetPeriod');
        return storedBudgetPeriod ? JSON.parse(storedBudgetPeriod) : 'weekly';
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    },[budget])
    
    const deleteExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))
    }
    useEffect(() => {
        localStorage.setItem('budgetPeriod', JSON.stringify(budgetPeriod)); 
      }, [budgetPeriod]);
    return(
        <ExpensesContext.Provider value={{expenses, setExpenses, budget , setBudget,deleteExpense, budgetPeriod, setBudgetPeriod}}>
            {children}
        </ExpensesContext.Provider>
    )
}