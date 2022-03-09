import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
function BudgetCard({
  name,
  amount,
  max,
  gray,
  controlExpenseModal,
  controlViewExpenseModal,
}) {
  const classnames = [];
  if (amount > max) {
    classnames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classnames.push("bg-light");
  }
  return (
    <Card className={classnames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <div className="me-2 text-capitalize">{name}</div>
          <div>
            ${amount}
            {max !== undefined && (
              <span className="text-muted fs-6"> / ${max}</span>
            )}
          </div>
        </Card.Title>
        {max !== undefined && (
          <ProgressBar
            className="rounded-pill"
            variant={getVariant(amount, max)}
            min={0}
            max={max === 0 ? 0.1 : max}
            now={amount}
          />
        )}
        <Stack
          direction="horizontal"
          gap={2}
          className="mt-4 justify-content-end"
        >
          {controlExpenseModal && (
            <>
              <Button variant="outline-primary" onClick={controlExpenseModal}>
                Add Expense
              </Button>
              <Button
                variant="outline-secondary"
                onClick={controlViewExpenseModal}
              >
                View Expense
              </Button>
            </>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function getVariant(amount, max) {
  const ratio = (amount * 100) / max;
  if (ratio < 25) {
    return "primary";
  } else if (ratio < 75) {
    return "warning";
  } else {
    return "danger";
  }
}

export default BudgetCard;
