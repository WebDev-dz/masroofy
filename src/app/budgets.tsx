import React, { useState } from "react";
import { DataTable } from "../components/ui/data-table/data-table";
import { getBudgetColumns } from "../components/budgets/budgetsTable/columns";
import { useBudgetStore } from "../stores/budgetStore";
import { Link } from "react-router-dom";
import { buttonVariants } from "../components/ui/button";

type Props = {};

const BudgetsPage = (props: Props) => {
  const [dateFilter, setDateFilter] = useState<string>("");

  const { budgets, updateBudget, deleteBudget } = useBudgetStore(
    (state) => state
  );
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budgets</h1>
        <Link to = "/budget/new" className= {buttonVariants({variant: "default"})}>Add Budget</Link>
      </div>

      <DataTable
        data={budgets}
        columns={getBudgetColumns({ editBudget: updateBudget, deleteBudget })}
      />
    </div>
  );
};

export default BudgetsPage;
