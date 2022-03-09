import { Modal, Button } from "react-bootstrap";
import { useBudgetContext } from "../contexts/useBudgetContext";

function ViewExpenseModal({ show, onHide, viewBudgetId }) {
  const { getBudgetExpenses, budgets, deleteExpense, deleteBudget } =
    useBudgetContext();
  const budgetName = budgets.find((budget) => budget.id === viewBudgetId)?.name;
  const expenses = getBudgetExpenses(viewBudgetId);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Expenses -{" "}
          <span className="text-capitalize me-2">
            {budgetName ? budgetName : "uncategorized"}
          </span>
          {budgetName && (
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteBudget(viewBudgetId);
                onHide();
              }}
            >
              Delete
            </Button>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {expenses.map((expense) => {
          return (
            <div key={expense.id} className="d-flex align-items-baseline mb-3">
              <div className="me-auto">
                {expense.description} - ${expense.amount}
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpenseModal;
