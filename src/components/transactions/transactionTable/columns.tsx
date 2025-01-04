"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import { DataTableColumnHeader } from "../../ui/data-table/data-table-column-header";
import { labels, statuses, priorities } from "./data";
import { Account, Category, Transaction } from "@/src/types/models";
import { cn } from "../../../lib/utils";
import { Link } from "react-router-dom";

export const getColumns = (accounts: Account[]) =>{


  
  return ([
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "transactionId",
      header: ({column}) => (<DataTableColumnHeader className="w-20" column={column} title="Transaction Id" />),
      cell: ({row}) => (<Link className="w-full text-center" to= {`/transaction/${row.getValue("transactionId")}`} >
        <div className="w-full">  {row.getValue("transactionId")} </div> </Link>)
    },
    {
      accessorKey: "fromAccountId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {
        const account = accounts.find(
          (label) => label.accountId === row.original.fromAccountId
        );

        return (
          <div className="flex space-x-2">
            {account && <h4>{account.name}</h4>}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="date" />
      ),
      cell: ({ row }) => {
        

        return (
          <div className="flex space-x-2">
            {(new Date(row.getValue("date"))).toDateString()}
          </div>
        );
      },
    },
    
    {
      accessorKey: "fromAccountId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {
        const account = accounts.find(
          (label) => label.accountId === row.original.fromAccountId
        );

        return (
          <div className="flex space-x-2">
            {account && <h4>{account.name}</h4>}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const account = accounts.find(
          (label) => label.accountId === row.original.fromAccountId
        );
        const type = row.getValue("type") as "income" | "expense";
        return (
          <div
            className={cn("font-semibold", {
              "text-green-500": type == "income",
              "text-red-500": type == "expense",
            })}
          >
            { (type == "expense" ? "-" : "+") + row.getValue("amount") + " " + account?.currency || ""}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const category = row.getValue("category") as Category;
        return (
          <div className="w-[80px] flex">
            {category?.icon + " " + category?.name}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type") as "income" | "expense";

        if (!type) {
          return null;
        }

        return (
          <Badge
            className={cn({
              "text-green-500 bg-green-100": type === "income",
              "text-red-500 bg-red-100": type === "expense",
            })}
            variant={"outline"}
          >
            {type}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]) as ColumnDef<Transaction>[]} ;

