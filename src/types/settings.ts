import { ShoppingList, Transaction } from "./models";

export type WidgetType =
  | "recent-transactions"
  | "budget-overview"
  | "savings-goals"
  | "expense-chart"
  | "income-chart"
  | "account-balance"
  | "shopping-list"
  | "bills-due"
  | "categories";

export type BaseWidget = {
  id: string;
  type: WidgetType;
  description?: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  title: string;
  isCollapsed?: boolean;
};


export type TransactionsWidget = {
  type: "recent-transactions";
  limit: number;
  showFilters?: boolean;
}
export type BudgetWidget = {
  type: "budget-overview";
  budgetIds: number[];
  limit?: number;
  showProgress: boolean;
}
export type SavingGoalWidget = {
  type: "savings-goals";
  goalIds: number[];
  showProjections?: boolean;
  projectionSettings?: {
    assumedInterestRate?: number; // e.g., 2.5% annual return
    includeRecurringDeposits: boolean;
    monthsToProject: number; // how far into future to project
    showMilestones: boolean; // show key dates (25%, 50%, 75%, 100%)
  };
}
export type ExpenseChartWidget = {
  type: "expense-chart";
  chartType: "pie" | "bar" | "line";
  timeRange: "week" | "month" | "year";
  categoryIds?: string[];
}
export type IncomeChartWidget = {
  type: "income-chart";
  chartType: "pie" | "bar" | "line";
  timeRange: "week" | "month" | "year";
  categoryIds?: string[];
}
export type AccountWidget = {
  type: "account-balance";
  budgetIds: number[];
  showAmount: boolean;
}
export type BillsWidget = {
  type: "bills-due";
  goalIds: number[];
  showProjections?: boolean;
}

export type ShoppingListWidget =  {
  type: "shopping-list";
  shoppingLists: ShoppingList[];
}
export type CategoryWidget = {
  type: "categories"
}
export type DashboardWidget = BaseWidget &
  ( TransactionsWidget
    | BudgetWidget
    | SavingGoalWidget
    | ExpenseChartWidget
    |  IncomeChartWidget
    | AccountWidget
    | BillsWidget 
    | ShoppingListWidget
    | CategoryWidget
  );

export type Widget = {
  "recent-transactions": BaseWidget & {
    limit: number;
    showFilters?: boolean;
  };
  "budget-overview": BaseWidget & {
    budgetIds: number[];
    showProgress: boolean;
  };
  "account-balance": BaseWidget & {
    budgetIds: number[];
    showAmount: boolean;
  };
  "savings-goals": BaseWidget & {
    goalIds: number[];
    showProjections?: boolean;
    projectionSettings?: {
      assumedInterestRate?: number; // e.g., 2.5% annual return
      includeRecurringDeposits: boolean;
      monthsToProject: number; // how far into future to project
      showMilestones: boolean; // show key dates (25%, 50%, 75%, 100%)
    };
  };
  "bills-due": BaseWidget & {
    goalIds: number[];
    showProjections?: boolean;
  };
  "expense-chart": BaseWidget & {
    chartType: "pie" | "bar" | "line";
    timeRange: "week" | "month" | "year";
    categoryIds?: string[];
  };
  "income-chart": BaseWidget & {
    chartType: "pie" | "bar" | "line";
    timeRange: "week" | "month" | "year";
    categoryIds?: string[];
  };
  "shopping-list": BaseWidget & {
    shoppingLists: ShoppingList[];
  };
};

export type Dashboard = {
  dashboardId: number;
  name: string;
  widgets: Array<DashboardWidget>;
  layout: "grid" | "list";
  isDefault?: boolean;
};
