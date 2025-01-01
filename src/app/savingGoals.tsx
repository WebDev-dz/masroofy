import React, { useState } from "react";
import { DataTable } from "../components/ui/data-table/data-table";
import { useSavingsGoalStore } from "../stores/savingsGoalStore";
import { getSavingGoalsColumns } from "../components/savingGoals/savingGoalsTable/columns";

type Props = {};

const SavingGoalsPage = (props: Props) => {
  const [dateFilter, setDateFilter] = useState<string>("");

  const { savingsGoals, deleteSavingsGoal, updateSavingsGoal } =
    useSavingsGoalStore((state) => state);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SavingGoals</h1>
      </div>

      <DataTable
        data={savingsGoals}
        columns={getSavingGoalsColumns({
          editSavingsGoal: updateSavingsGoal,
          deleteSavingsGoal: deleteSavingsGoal,
        })}
      />
    </div>
  );
};

export default SavingGoalsPage;
