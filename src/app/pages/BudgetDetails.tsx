import BudgetForm from "../../components/budgets/form";
import { useBudgetStore } from "../../stores/budgetStore";
import React from "react";
import { useParams } from "react-router-dom";
import { PencilIcon } from "lucide-react";

type Props = {};

const BudgetDetails = () => {
  const { id } = useParams(); // Extract the id from the route params
  const { budgets, updateBudget } = useBudgetStore();

  // Convert the id to a number since budgetId is numeric
  const budgetId = parseInt(id || "0", 10);
  const budget = budgets.find(
    (tr) => tr.budgetId === budgetId
  );

  if (!budget) {
    return <div>Budget not found</div>; // Handle case when budget is not found
  }

  return (
    <div className="p-4 space-y-3">
      
      <BudgetForm
        title="Budget Details"
        onSubmit={updateBudget}
        type="update"
        value={budget}
      />
    </div>
  );
};

export default BudgetDetails;
