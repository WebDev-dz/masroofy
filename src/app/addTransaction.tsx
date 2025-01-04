import React from "react";
import { useTransactionStore } from "../stores/transactionStore"; // Adjust the import path as necessary
import TransactionForm from "../components/transactions/form"; // Adjust the import path as necessary
import { AsyncOperation, Transaction } from "../types/models"; // Adjust the import path as necessary
import { transactionSchema } from "../schemas/validationSchema";
import { z } from "zod";

const AddTransaction: React.FC = () => {
  const { addTransaction, deleteTransaction } = useTransactionStore(); // Get the addTransaction function from the store

  const handleAddTransaction = async (transactionData: Transaction) => {
    try {
      await addTransaction(transactionData);
      // Optionally, redirect or show a success message
      console.log("Transaction added successfully");

      return { data: [], error: null, loading: false };
    } catch (error) {
      console.error("Failed to add transaction:", error);
      return { data: null, error: error as Error, loading: false };
      // Optionally, show an error message
    }
  };
  // @ts-ignore
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold">Add New Transaction</h1> */}
      {/* @ts-ignore */}
      <TransactionForm title="Add New Transaction" type="create" onSubmit={handleAddTransaction} />
    </div>
  );
};

export default AddTransaction;
