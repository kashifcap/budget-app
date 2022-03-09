import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard.js";
import {
  useBudgetContext,
  UNCATEGORIZED_EXPENSE_ID,
} from "./contexts/useBudgetContext.js";
import AddBudgetModal from "./components/AddBudgetModal.js";
import AddExpenseModal from "./components/AddExpenseModal.js";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard.js";
import TotalBudgetCard from "./components/TotalBudgetCard.js";
import { useState } from "react";

function App() {
  const { budgets, getBudgetExpenses } = useBudgetContext();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [defaultId, setDefaultId] = useState(UNCATEGORIZED_EXPENSE_ID);

  function controlExpenseModal(id) {
    setDefaultId(id);
    setShowExpenseModal(true);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => controlExpenseModal(UNCATEGORIZED_EXPENSE_ID)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                controlExpenseModal={() => controlExpenseModal(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            controlExpenseModal={() =>
              controlExpenseModal(UNCATEGORIZED_EXPENSE_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showBudgetModal}
        onHide={() => setShowBudgetModal(false)}
      />
      <AddExpenseModal
        show={showExpenseModal}
        onHide={() => setShowExpenseModal(false)}
        defaultId={defaultId}
      />
    </>
  );
}

export default App;
