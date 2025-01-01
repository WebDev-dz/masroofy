import { create } from "zustand"; // Importing  from Zustand
import { BudgetStoreActions, BudgetStoreState } from "../types/stores";
import { Budget } from "../types/models";
import { persist } from "zustand/middleware";

type BadgetStore = BudgetStoreState & BudgetStoreActions;
const defaultBudgets = [
  {
    budgetId: 1,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 1,
      balance: 1000,
      currency: "USD",
      type: "checking",
      color: "blue",
      name: "Main Checking",
      isActive: true,
    },
    period: "Monthly",
    limit: 500,
    currentAmount: 200,
    category: {
      id: "1",
      name: "Groceries",
      icon: "🛒",
      theme: "green",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 2,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 1,
      balance: 1000,
      currency: "USD",
      type: "checking",
      color: "blue",
      name: "Main Checking",
      isActive: true,
    },
    period: "Monthly",
    limit: 300,
    currentAmount: 150,
    category: {
      id: "2",
      name: "Utilities",
      icon: "💡",
      theme: "blue",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 3,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Yearly",
    limit: 6000,
    currentAmount: 4000,
    category: {
      id: "3",
      name: "Rent",
      icon: "🏠",
      theme: "red",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 4,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Monthly",
    limit: 200,
    currentAmount: 100,
    category: {
      id: "4",
      name: "Entertainment",
      icon: "🎬",
      theme: "purple",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 5,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Weekly",
    limit: 100,
    currentAmount: 50,
    category: {
      id: "5",
      name: "Dining Out",
      icon: "🍽️",
      theme: "orange",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 6,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Monthly",
    limit: 150,
    currentAmount: 75,
    category: {
      id: "6",
      name: "Transportation",
      icon: "🚗",
      theme: "yellow",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 7,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Monthly",
    limit: 250,
    currentAmount: 100,
    category: {
      id: "7",
      name: "Health & Fitness",
      icon: "🏋️",
      theme: "green",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 8,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Yearly",
    limit: 1200,
    currentAmount: 600,
    category: {
      id: "8",
      name: "Insurance",
      icon: "🛡️",
      theme: "blue",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 9,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Monthly",
    limit: 400,
    currentAmount: 200,
    category: {
      id: "9",
      name: "Savings",
      icon: "💰",
      theme: "purple",
      isActive: true,
    },
    status: "active",
    isRecurring: true,
  },
  {
    budgetId: 10,
    startDate: "2024-03-01T00:00:00Z",

    account: {
      accountId: 2,
      balance: 5000,
      currency: "USD",
      type: "savings",
      color: "green",
      name: "Emergency Fund",
      isActive: true,
    },
    period: "Monthly",
    limit: 300,
    currentAmount: 150,
    category: {
      id: "10",
      name: "Miscellaneous",
      icon: "📦",
      theme: "gray",
      isActive: true,
    },
    status: "active",
    isRecurring: false,
  },
];

export const useBudgetStore = create<BadgetStore>()(
  persist(
    (set, get) => ({
      budgets: defaultBudgets as Budget[],

      fetchBudgets: async () => {
        try {
          set({ budgets: [] as Budget[] }); // Clear budgets before fetch starts
          const response = await new Promise<Budget[]>((resolve) =>
            setTimeout(
              () =>
                resolve(defaultBudgets as Budget[]),
              1000
            )
          );
          set({ budgets: response });
          return { data: response, loading: false, error: null };
        } catch (error) {
          return { data: null, loading: false, error: error as Error };
        }
      },

      addBudget: async (budget: Budget) => {
        try {
          const response = await new Promise<Budget>((resolve) =>
            setTimeout(() => resolve(budget), 500)
          );
          set((state) => ({ budgets: [...state.budgets, response] }));
          return { data: response, loading: false, error: null };
        } catch (error) {
          return { data: null, loading: false, error: error as Error };
        }
      },

      updateBudget: async (updatedBudget: Budget) => {
        try {
          const response = await new Promise<Budget>((resolve) =>
            setTimeout(() => resolve(updatedBudget), 500)
          );
          set((state) => ({
            budgets: state.budgets.map((budget) =>
              budget.budgetId === updatedBudget.budgetId ? response : budget
            ),
          }));
          return { data: response, loading: false, error: null };
        } catch (error) {
          return { data: null, loading: false, error: error as Error };
        }
      },

      deleteBudget: async (budgetId: number) => {
        try {
          const response = await new Promise<Budget | null>((resolve) =>
            setTimeout(
              () =>
                resolve(
                  get().budgets.find(
                    (budget) => budget.budgetId === budgetId
                  ) || null
                ),
              500
            )
          );
          if (response) {
            set((state) => ({
              budgets: state.budgets.filter(
                (budget) => budget.budgetId !== budgetId
              ),
            }));
          }
          return { data: response, loading: false, error: null };
        } catch (error) {
          return { data: null, loading: false, error: error as Error };
        }
      },
    }),
    {
      name: "account-storage", // Name of the storage key
    }
  )
);
