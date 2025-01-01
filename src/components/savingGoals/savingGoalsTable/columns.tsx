import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../ui/data-table/data-table-column-header";
import { SavingsGoal } from "@/src/types/models";
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";

export const getSavingGoalsColumns = ({
  editSavingsGoal,
  deleteSavingsGoal,
}: {
  editSavingsGoal: (goal: SavingsGoal) => void;
  deleteSavingsGoal: (id: number) => void;
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
          aria-label="Select all savings goals"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select savings goal"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "goalId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Goal ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("goalId")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Goal Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "targetAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Target Amount" />
      ),
      cell: ({ row }) => (
        <div>{`$${(row.getValue("targetAmount") as number).toFixed(2)}`}</div>
      ), // Format as currency
    },
    {
      accessorKey: "currentAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current Amount" />
      ),
      cell: ({ row }) => (
        <div>{`$${(row.getValue("currentAmount") as number).toFixed(2)}`}</div>
      ), // Format as currency
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => (
        <div>{new Date(row.getValue("dueDate")).toLocaleDateString()}</div>
      ), // Format date
    },

    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button onClick={() => editSavingsGoal(row.original)}>Edit</button>
          <button onClick={() => deleteSavingsGoal(row.original.goalId)}>
            Delete
          </button>
        </div>
      ),
    },
  ] as ColumnDef<SavingsGoal>[];
};
