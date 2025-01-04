import AccountForm from "../../components/accounts/form";
import { useAccountStore } from "../../stores/accountStore";
import React from "react";
import { useParams } from "react-router-dom";
import { PencilIcon } from "lucide-react";

type Props = {};

const AccountDetails = () => {
  const { id } = useParams(); // Extract the id from the route params
  const { accounts, updateAccount } = useAccountStore();

  // Convert the id to a number since accountId is numeric
  const accountId = parseInt(id || "0", 10);
  const account = accounts.find(
    (tr) => tr.accountId === accountId
  );

  if (!account) {
    return <div>Account not found</div>; // Handle case when account is not found
  }

  return (
    <div className="p-4 space-y-3">
      
      <AccountForm
        title="Account Details"
        onSubmit={updateAccount}
        type="update"
        value={account}
      />
    </div>
  );
};

export default AccountDetails;
