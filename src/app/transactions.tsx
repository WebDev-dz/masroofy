import React, { useState } from "react";
import { format } from "date-fns"; // Install with: npm install date-fns
import { FormDialog as CategoryFormDialog } from "../components/category/form";
import { DataTable } from "../components/ui/data-table/data-table";
import { getColumns } from "../components/transactions/transactionTable/columns";
import { useTransactionStore } from "../stores/transactionStore";
import { useAccountStore } from "../stores/accountStore";
import { FormDialog } from "../components/FormDialog";
import { Button, buttonVariants } from "../components/ui/button";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

const Transactions: React.FC = () => {
  // State for transactions and filters

  const { transactions, deleteTransaction } = useTransactionStore(
    (state) => state
  );

  const { accounts } = useAccountStore((state) => state);

  // State for categories
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Salary", type: "income" },
    { id: "2", name: "Food", type: "expense" },
    { id: "3", name: "Transportation", type: "expense" },
    { id: "4", name: "Entertainment", type: "expense" },
  ]);

  // State for new category form
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense" as "income" | "expense",
  });

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">(
    "all"
  );

  // Add new category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategory.name.trim(),
          type: newCategory.type,
        },
      ]);
      setNewCategory({ name: "", type: "expense" });
      setIsAddingCategory(false);
    }
  };

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory =
      categoryFilter === "all" || transaction.category.name === categoryFilter;
    const matchesDate = !dateFilter || transaction.date === dateFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesCategory && matchesDate && matchesType;
  });

  // Delete transaction
  const handleDelete = (id: string) => {
    deleteTransaction(parseInt(id));
  };

  // Edit transaction (you'll need to implement the edit form)
  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit transaction:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link to = "/transaction/new" className= {buttonVariants({variant: "default"})}>Add Transaction</Link>
      </div>

     

  
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="p-2 border rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as "all" | "income" | "expense")
          }
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Transactions Table */}
      {/*  */}
      <DataTable data={filteredTransactions} columns={getColumns(accounts)} />

      {/* No transactions message */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default Transactions;
