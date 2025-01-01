import React from "react";
import { BaseWidget, SavingGoalWidget as SavingGoalWidgetType } from "../../types/settings";
import { useSavingsGoalStore } from "../../stores/savingsGoalStore";

type Props = { widget: BaseWidget & SavingGoalWidgetType };

const SavingsGoalsWidget = ({ widget }: Props) => {
  const { savingsGoals } = useSavingsGoalStore((state) => state);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{widget.title}</h3>
      {widget.description && (
        <p className="text-sm text-muted-foreground">{widget.description}</p>
      )}
      <div className="mt-4">
        <p>Total Saving Goals: {savingsGoals?.length || 0}</p>
      </div>
    </div>
  );
};

export default SavingsGoalsWidget;
