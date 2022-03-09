import BudgetCard from "./BudgetCard";
import {
  useBudgetContext,
  UNCATEGORIZED_EXPENSE_ID,
} from "../contexts/useBudgetContext";

function UncategorizedBudgetCard({
  controlExpenseModal,
  controlViewExpenseModal,
}) {
  const { getBudgetExpenses } = useBudgetContext();
  const amount = getBudgetExpenses(UNCATEGORIZED_EXPENSE_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return <></>;
  return (
    <BudgetCard
      name="Uncategorized"
      amount={amount}
      gray
      controlExpenseModal={controlExpenseModal}
      controlViewExpenseModal={controlViewExpenseModal}
    />
  );
}

export default UncategorizedBudgetCard;
