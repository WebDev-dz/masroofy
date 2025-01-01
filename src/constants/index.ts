import { Dashboard, DashboardWidget } from '../types/settings';
import { currencies } from './currencies';









export const categories = [
    { id: "1", name: "Food", icon: "🍔", theme: "red", isActive: false },
    { id: "2", name: "Travel", icon: "✈️", theme: "blue", isActive: true },
  ]






export { currencies }


export const defaultDashboardConfig : Dashboard = {
  dashboardId: 1,
  name: "Default Dashboard",
  layout: "grid",
  isDefault: true,
  widgets: [
    {
      id: "1",
      type: "recent-transactions",
      title: "Recent Transactions",
      position: { x: 0, y: 0, width: 2, height: 3 },
      limit: 5,
      showFilters: true,
    },
    {
      id: "2",
      type: "budget-overview",
      title: "Budget Overview",
      position: { x: 0, y: 1, width: 2, height: 3 },
      budgetIds: [1, 2, 3],
      showProgress: true,
    },
    // {
    //   id: "3",
    //   type: "savings-goals",
    //   title: "Savings Goals",
    //   position: { x: 0, y: 3, width: 4, height: 3 },
    //   goalIds: [101, 102],
    //   showProjections: true,
    //   projectionSettings: {
    //     assumedInterestRate: 3.0,
    //     includeRecurringDeposits: true,
    //     monthsToProject: 24,
    //     showMilestones: true,
    //   },
    // },
    {
      id: "4",
      type: "expense-chart",
      title: "Expense Chart",
      position: { x: 1, y: 3, width: 2, height: 2 },
      chartType: "bar",
      timeRange: "month",
      categoryIds: ["food", "utilities", "transportation"],
    },
    {
      id: "5",
      type: "income-chart",
      title: "Income Chart",
      position: { x: 2, y: 3, width: 2, height: 2 },
      chartType: "line",
      timeRange: "year",
      categoryIds: ["salary", "investments"],
    },
    // {
    //   id: "6",
    //   type: "account-balance",
    //   title: "Account Balances",
    //   position: { x: 4, y: 6, width: 4, height: 3 },
    //   budgetIds: [201, 202, 203],
    //   showAmount: true,
    // },
    // {
    //   id: "7",
    //   type: "bills-due",
    //   title: "Bills Due",
    //   position: { x: 0, y: 9, width: 8, height: 3 },
    //   goalIds: [301, 302],
    //   showProjections: false,
    // }, 
    {
      id: "8",
      type: "shopping-list",
      title: "Shopping List",
      "position" : {x: 0, y : 9,width: 3 ,height: 4},
      "shoppingLists": []

    }
  ],
};

