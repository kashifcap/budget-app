import BudgetCard from "./BudgetCard";
import { useBudgetContext } from "../contexts/useBudgetContext";

function UncategorizedBudgetCard() {
  const { expenses, budgets } = useBudgetContext();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  return <BudgetCard name="Total" amount={amount} max={max} />;
}

export default UncategorizedBudgetCard;
