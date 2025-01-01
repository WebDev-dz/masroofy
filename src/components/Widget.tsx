import React from "react";
import { WidgetType, Widget, DashboardWidget, TransactionsWidget } from '../types/settings'; // Adjust the path
import { BarChartWidget } from "./ui/barChart";
import {
  getTransactionsChartConfig,
  groupTransactionsByCategory,
  useTransactionStore,
} from "../stores/transactionStore";
import TransactionWidget from "./widgets/TransactionWidget";
import BudgetWidget from "./widgets/BudgetWidget";
import SavingsGoalsWidget from "./widgets/SavingGoalWidget";
import ShoppingListWidget from "./widgets/ShoppingListWidget";
import BillWidget from "./widgets/BillWidget";
import ChartWidget from "./widgets/ChartWidget";

export function WidgetRenderer({ widget,  }: { widget: DashboardWidget }) {
  //@ts-ignore
  switch (widget?.type) {
    case "recent-transactions":
      //@ts-ignore
      return <TransactionWidget widget={widget} />

    case "budget-overview":
      return <BudgetWidget  widget={widget}/>

    case "savings-goals":
      return <SavingsGoalsWidget widget={widget} />

    case "expense-chart":
    case "income-chart":
      return <ChartWidget widget={widget} />

    case "bills-due":
      return <BillWidget widget={widget} />;

      case "shopping-list":
        return <ShoppingListWidget widget={widget} />

    default:
      return <p>Unknown widget type: {widget?.type}</p>;
  }
}
