import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgetContext } from "../contexts/useBudgetContext";

function AddBudgetModal({ show, onHide }) {
  const { addBudget } = useBudgetContext();
  const nameRef = useRef();
  const maxRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseInt(maxRef.current.value),
    });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Expense</Form.Label>
            <Form.Control ref={maxRef} type="number" min={0} required />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBudgetModal;
