import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import {
  useBudgetContext,
  UNCATEGORIZED_EXPENSE_ID,
} from "../contexts/useBudgetContext";

function AddExpenseModal({ show, onHide, defaultId }) {
  const { budgets, addBudgetExpense } = useBudgetContext();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudgetExpense({
      description: descriptionRef.current.value,
      amount: parseInt(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={0.1}
              required
            />
          </Form.Group>
          <Form.Select
            ref={budgetIdRef}
            className="mb-3"
            defaultValue={defaultId}
          >
            <option value={UNCATEGORIZED_EXPENSE_ID}>Uncategorized</option>
            {budgets.map((budget) => {
              return (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              );
            })}
          </Form.Select>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddExpenseModal;
