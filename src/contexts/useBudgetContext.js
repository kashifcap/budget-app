import { createContext, useContext } from "react";
import { v4 as uuid4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const budgetContext = createContext();

export const useBudgetContext = () => {
  return useContext(budgetContext);
};

function BudgetProvider({ children }) {
  const [budgets, setbudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function getBudgetExpense(id) {
    return expenses.filter((expense) => expense.budgetId === id);
  }
  function deleteExpense(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }
  function deleteBudget(id) {
    setbudgets((prevBudgets) =>
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
    setExpenses((prevExpenses) => [
      {
        id: uuid4(),
        ...budget,
      },
      ...prevExpenses,
    ]);
  }
  return (
    <budgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpense,
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
