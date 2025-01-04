import TransactionForm from "../../components/transactions/form";
import { useTransactionStore } from "../../stores/transactionStore";
import React from "react";
import { useParams } from "react-router-dom";
import { PencilIcon } from "lucide-react";

type Props = {};

const TransactionDetails = () => {
  const { id } = useParams(); // Extract the id from the route params
  const { transactions, updateTransaction } = useTransactionStore();

  // Convert the id to a number since transactionId is numeric
  const transactionId = parseInt(id || "0", 10);
  const transaction = transactions.find(
    (tr) => tr.transactionId === transactionId
  );

  if (!transaction) {
    return <div>Transaction not found</div>; // Handle case when transaction is not found
  }

  return (
    <div className="p-4 space-y-3">
      
      <TransactionForm
        onSubmit={updateTransaction}
        title="Transaction Details"
        type="update"
        value={transaction}
      />
    </div>
  );
};

export default TransactionDetails;
