import {create, } from 'zustand'; // Importing  from Zustand
import { TransactionStore,  } from '../types/stores';
import { Transaction } from '../types/models';
import { persist } from 'zustand/middleware'
import { ChartConfig } from '../components/ui/chart';


const transactions : Transaction[] = [
  {
    transactionId: 1,
    amount: 50.00,
    date: "2024-03-01T10:00:00Z",
    category: { id: "1", name: "Groceries", icon: "pizza", theme: "green", isActive: true },
    tags: ["food", "weekly"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Weekly grocery shopping",
    reference: "Receipt #001",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    transactionId: 2,
    amount: 200.00,
    date: "2024-03-02T12:00:00Z",
    category: { id: "2", name: "Utilities", icon: "settings", theme: "blue", isActive: true },
    tags: ["electricity"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Monthly electricity bill",
    reference: "Bill #002",
    createdAt: "2024-03-02T12:00:00Z",
    updatedAt: "2024-03-02T12:00:00Z",
  },
  {
    transactionId: 3,
    amount: 1500.00,
    date: "2024-03-03T09:00:00Z",
    category: { id: "3", name: "Salary", icon: "wallet", theme: "green", isActive: true },
    tags: ["income"],
    fromAccountId: null,
    toAccountId: 2,
    type: "income",
    status: "completed",
    description: "Monthly salary deposit",
    reference: "Pay Stub #003",
    createdAt: "2024-03-03T09:00:00Z",
    updatedAt: "2024-03-03T09:00:00Z",
  },
  {
    transactionId: 4,
    amount: 75.00,
    date: "2024-03-04T14:00:00Z",
    category: { id: "4", name: "Dining", icon: "close", theme: "red", isActive: true },
    tags: ["food", "dinner"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Dinner at a restaurant",
    reference: "Receipt #004",
    createdAt: "2024-03-04T14:00:00Z",
    updatedAt: "2024-03-04T14:00:00Z",
  },
  {
    transactionId: 5,
    amount: 300.00,
    date: "2024-03-05T16:00:00Z",
    category: { id: "5", name: "Shopping", icon: "page", theme: "purple", isActive: true },
    tags: ["clothes"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Clothing shopping",
    reference: "Receipt #005",
    createdAt: "2024-03-05T16:00:00Z",
    updatedAt: "2024-03-05T16:00:00Z",
  },
  {
    transactionId: 6,
    amount: 20.00,
    date: "2024-03-06T11:00:00Z",
    category: { id: "6", name: "Transport", icon: "car", theme: "orange", isActive: true },
    tags: ["fuel"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Gas refill",
    reference: "Receipt #006",
    createdAt: "2024-03-06T11:00:00Z",
    updatedAt: "2024-03-06T11:00:00Z",
  },
  {
    transactionId: 7,
    amount: 500.00,
    date: "2024-03-07T13:00:00Z",
    category: { id: "7", name: "Rent", icon: "house", theme: "blue", isActive: true },
    tags: ["housing"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Monthly rent payment",
    reference: "Receipt #007",
    createdAt: "2024-03-07T13:00:00Z",
    updatedAt: "2024-03-07T13:00:00Z",
  },
  {
    transactionId: 8,
    amount: 100.00,
    date: "2024-03-08T15:00:00Z",
    category: { id: "8", name: "Entertainment", icon: "media", theme: "yellow", isActive: true },
    tags: ["movies"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Movie tickets",
    reference: "Receipt #008",
    createdAt: "2024-03-08T15:00:00Z",
    updatedAt: "2024-03-08T15:00:00Z",
  },
  {
    transactionId: 9,
    amount: 250.00,
    date: "2024-03-09T17:00:00Z",
    category: { id: "9", name: "Insurance", icon: "shield", theme: "green", isActive: true },
    tags: ["health"],
    fromAccountId: 1,
    toAccountId: null,
    type: "expense",
    status: "completed",
    description: "Health insurance payment",
    reference: "Receipt #009",
    createdAt: "2024-03-09T17:00:00Z",
    updatedAt: "2024-03-09T17:00:00Z",
  },
  {
    transactionId: 10,
    amount: 300.00,
    date: "2024-03-10T19:00:00Z",
    category: { id: "10", name: "Savings", icon: "wallet", theme: "blue", isActive: true },
    tags: ["investment"],
    fromAccountId: 1,
    toAccountId: null,
    type: "income",
    status: "completed",
    description: "Monthly savings deposit",
    reference: "Deposit #010",
    createdAt: "2024-03-10T19:00:00Z",
    updatedAt: "2024-03-10T19:00:00Z",
  },
];



export const useTransactionStore = create<TransactionStore>()(persist((set, get) => ({
  transactions: transactions,

  fetchTransactions: async () => {
    try {
      set({ transactions: [] }); // Clear transactions before fetch starts
      const response = await new Promise<Transaction[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                transactionId: 1,
                amount: 100,
                date: "2024-03-20T15:30:00Z",
                category: { id: "1", name: "Food", icon: "pizza", theme: "red", isActive: true },
                tags: ["groceries"],
                fromAccountId: 1,
                toAccountId: null,
                type: "expense",
                status: "completed",
                description: "Grocery shopping",
                reference: "Receipt #123",
                createdAt: "2024-03-20T15:30:00Z",
                updatedAt: "2024-03-20T15:30:00Z",
              },
              {
                transactionId: 2,
                amount: 200,
                date: "2024-03-21T15:30:00Z",
                category: { id: "2", name: "Salary", icon: "wallet", theme: "green", isActive: true },
                tags: ["income"],
                fromAccountId: null,
                toAccountId: 2,
                type: "income",
                status: "completed",
                description: "Monthly salary",
                reference: "Pay Stub",
                createdAt: "2024-03-21T15:30:00Z",
                updatedAt: "2024-03-21T15:30:00Z",
              },
            ]),
          1000
        )
      );
      set({ transactions: response });
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  addTransaction: async (transaction: Transaction) => {
    try {
      const response = await new Promise<Transaction>((resolve) =>
        setTimeout(() => resolve(transaction), 500)
      );
      set((state) => ({ transactions: [...state.transactions, response] }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  updateTransaction: async (updatedTransaction: Transaction) => {
    try {
      const response = await new Promise<Transaction>((resolve) =>
        setTimeout(() => resolve(updatedTransaction), 500)
      );
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.transactionId === updatedTransaction.transactionId ? response : transaction
        ),
      }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  deleteTransaction: async (transactionId: number) => {
    try {
      const response = await new Promise<Transaction | null>((resolve) =>
        setTimeout(
          () =>
            resolve(
              get().transactions.find((transaction) => transaction.transactionId === transactionId) ||
                null
            ),
          500
        )
      );
      if (response) {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.transactionId !== transactionId
          ),
        }));
      }
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },
}), {
  name: 'account-storage', // Name of the storage key
})); 



export const TransactionsChartConfig = {

}


export function groupTransactionsByCategory(transactions: Transaction[]) {
  const grouped = transactions.reduce<Record<string , number>>((acc, transaction) => {
    if (!acc[transaction.category.name]) {
      acc[transaction.category.name] = 0;
    }
    acc[transaction.category.name] += transaction.amount;
    return acc;
  }, {});

  return Object.keys(grouped).map((category) => ({
    category,
    amount: grouped[category],
  }));
}


export function getTransactionsChartConfig(transactions: Transaction[]) {
  const grouped = transactions.reduce<ChartConfig>((acc, transaction) => {
    if (!acc[transaction.category.name]) {
      acc[transaction.category.name] = { label : transaction.category.name, color: transaction.category.theme, };
    }
    
    return acc;
  }, {});

  return grouped
}