import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../ui/data-table/data-table-column-header";
import { AsyncOperation, Budget } from "@/src/types/models";
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";
import { ConfirmationDialog } from "../../ConfirmationModel";
import { Button } from "../../ui/button";

export const getBudgetColumns = ({
  editBudget,
  deleteBudget,
}: {
  editBudget: (budget: Budget) => AsyncOperation<any>;
  deleteBudget: (budgetId: number) => AsyncOperation<any>;
}) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all budgets"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select budget"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "budgetId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Budget ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("budgetId")}</div>,
    },
    {
      accessorKey: "account.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {console.log({row}); return <div>{row.original.account.name}</div>}, // Assuming account has a name property
    },
    {
      accessorKey: "period",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Period" />
      ),
      cell: ({ row }) => <div>{row.getValue("period")}</div>,
    },
    {
      accessorKey: "limit",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Limit" />
      ),
      cell: ({ row }) => {
        const limit = row.getValue("limit") as number;
        return <div>{`$${limit.toFixed(2)}`}</div>;
      }, // Format as currency
    },
    {
      accessorKey: "currentAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current Amount" />
      ),
      cell: ({ row }) => {
        const currentAmount = row.getValue("currentAmount") as number;
        return <div>{`$${currentAmount.toFixed(2)}`}</div>;
      }, // Format as currency
    },

    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button onClick={() => editBudget(row.original)}>Edit</button>

          <ConfirmationDialog
            triggerButton={
              <Button variant={"destructive"} >
                Delete
              </Button>
            }
            title={"Delete Confirmation"}
            description="Are You sure to delete this budget? this Operation can't be undone"
            onConfirm={() => deleteBudget(row.original.budgetId)}
          />
         
        </div>
      ),
    },
  ] as ColumnDef<Budget>[];
};
