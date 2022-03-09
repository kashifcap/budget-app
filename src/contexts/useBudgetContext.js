import { createContext, useContext } from "react";
import { v4 as uuid4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export const UNCATEGORIZED_EXPENSE_ID = "uncategorized";

const budgetContext = createContext();

export const useBudgetContext = () => {
  return useContext(budgetContext);
};

function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function getBudgetExpenses(id) {
    return expenses.filter((expense) => expense.budgetId === id);
  }
  function deleteExpense(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }
  function deleteBudget(id) {
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== id)
    );
  }
  function addBudgetExpense(expense) {
    setExpenses((prevExpenses) => [
      {
        id: uuid4(),
        ...expense,
      },
      ...prevExpenses,
    ]);
  }
  function addBudget(budget) {
    setBudgets((prevBudgets) => [
      {
        id: uuid4(),
        ...budget,
      },
      ...prevBudgets,
    ]);
  }
  return (
    <budgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        deleteBudget,
        deleteExpense,
        addBudgetExpense,
        addBudget,
      }}
    >
      {children}
    </budgetContext.Provider>
  );
}

export default BudgetProvider;
