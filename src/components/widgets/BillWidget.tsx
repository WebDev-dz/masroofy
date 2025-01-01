import React from "react";
import { BaseWidget, BillsWidget as BillsWidgetType } from "../../types/settings";
import { useBillSubscriptionStore } from "../../stores/billSubscriptionStore";

type Props = { widget: BaseWidget & BillsWidgetType };

const BillWidget = ({ widget }: Props) => {
  // Access data from the store
  const { billSubscriptions } = useBillSubscriptionStore((state) => state);

  // Example logic: calculate total bills due and the upcoming due date
  const totalBillsDue = billSubscriptions?.length || 0;
  const upcomingDueDate = billSubscriptions
    ?.map((bill) => new Date(bill.dueDate))
    .sort((a, b) => a.getTime() - b.getTime())[0]
    ?.toLocaleDateString() || "N/A";

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{widget.title}</h3>
      {widget?.description && (
        <p className="text-sm text-muted-foreground">{widget?.description}</p>
      )}
      <div className="mt-4 space-y-2">
        <p>
          <strong>Total Bills Due:</strong> {totalBillsDue}
        </p>
        <p>
          <strong>Upcoming Due Date:</strong> {upcomingDueDate}
        </p>
      </div>
    </div>
  );
};

export default BillWidget;
