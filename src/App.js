import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard.js";
import { useBudgetContext } from "./contexts/useBudgetContext.js";

function App() {
  const { budgets } = useBudgetContext();
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
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
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={20}
              max={budget.max}
            />
          );
        })}
        {/* <BudgetCard name="food" amount={20} max={100} /> */}
      </div>
    </Container>
  );
}

export default App;
