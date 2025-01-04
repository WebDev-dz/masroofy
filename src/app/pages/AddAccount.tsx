import React from "react";
import { useAccountStore } from "../../stores/accountStore"; // Adjust the import path as necessary
import AccountForm from "../../components/accounts/form"; // Adjust the import path as necessary
import { Account } from "../../types/models"; // Adjust the import path as necessary
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; // Adjust the import path as necessary

const AddAccount: React.FC = () => {
  const { addAccount } = useAccountStore(); // Get the addAccount function from the store

  const handleAddAccount = async (accountData: Account) => {
    try {
      await addAccount(accountData);
      // Optionally, redirect or show a success message
      console.log("Account added successfully");

      return { data: [], error: null, loading: false };
    } catch (error) {
      console.error("Failed to add account:", error);
      return { data: null, error: error as Error, loading: false };
      // Optionally, show an error message
    }
  };

  return (
    <div className="p-4">
      <AccountForm
        title="Add New Account"
        type="create"
        onSubmit={handleAddAccount}
      />
    </div>
  );
};

export default AddAccount;
