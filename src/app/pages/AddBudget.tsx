import React from "react";
import { useBudgetStore } from "../../stores/budgetStore"; // Adjust the import path as necessary
import BudgetForm from "../../components/budgets/form"; // Adjust the import path as necessary
import { Budget } from "../../types/models"; // Adjust the import path as necessary
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; // Adjust the import path as necessary

const AddBudget: React.FC = () => {
  const { addBudget } = useBudgetStore(); // Get the addBudget function from the store

  const handleAddBudget = async (budgetData: Budget) => {
    try {
      await addBudget(budgetData);
      // Optionally, redirect or show a success message
      console.log("Budget added successfully");

      return { data: [], error: null, loading: false };
    } catch (error) {
      console.error("Failed to add budget:", error);
      return { data: null, error: error as Error, loading: false };
      // Optionally, show an error message
    }
  };

  return (
    <div className="p-4">
      <BudgetForm
        title="Add New Budget"
        type="create"
        onSubmit={handleAddBudget}
      />
    </div>
  );
};

export default AddBudget;
