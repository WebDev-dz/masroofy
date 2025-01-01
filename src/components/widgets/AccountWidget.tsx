import React from "react";
import { BaseWidget, AccountWidget as AccountWidgetType } from "../../types/settings";
import { useAccountStore } from "../../stores/accountStore";

type Props = { widget: BaseWidget & AccountWidgetType };

const AccountWidget = ({ widget }: Props) => {
  const { accounts } = useAccountStore((state) => state);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{widget.title}</h3>
      {widget.description && (
        <p className="text-sm text-muted-foreground">{widget.description}</p>
      )}
      <div className="mt-4">
        <p>Total Accounts: {accounts?.length || 0}</p>
      </div>
    </div>
  );
};

export default AccountWidget;
