import { Category, Account, Transaction, Budget, SavingsGoal, BillSubscription, ShoppingList, AsyncOperation } from './models';

// Define the generic store type
export type Store<T, A> = T & A

// Define the state and actions for each store

// Category Store Types
export type CategoryStoreState = {
  categories: Category[];
};

export type CategoryStoreActions = {
  addCategory: (category: Category) => AsyncOperation<Category>;
  updateCategory: (updatedCategory: Category) => AsyncOperation<Category>;
  deleteCategory: (categoryId: string) => AsyncOperation<Category>;
  fetchCategories: () => AsyncOperation<Category[]>;
};

// Account Store Types
export type AccountStoreState = {
  accounts: Account[];
};

export type AccountStoreActions = {
  addAccount: (account: Account) => AsyncOperation<Account>;
  updateAccount: (updatedAccount: Account) => AsyncOperation<Account>;
  deleteAccount: (accountId: number) => AsyncOperation<Account>;
  fetchAccounts: () => AsyncOperation<Account[]>;
};

// Transaction Store Types
export type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => AsyncOperation<Transaction>;
  updateTransaction: (updatedTransaction: Transaction) => AsyncOperation<Transaction>;
  deleteTransaction: (transactionId: number) => AsyncOperation<Transaction>;
  fetchTransactions: () => AsyncOperation<Transaction[]>;
};

export type TransactionStoreActions = {
  addTransaction: (transaction: Transaction) => AsyncOperation<Transaction>;
  updateTransaction: (updatedTransaction: Transaction) => AsyncOperation<Transaction>;
  deleteTransaction: (transactionId: number) => AsyncOperation<Transaction>;
  fetchTransactions: () => AsyncOperation<Transaction[]>;
};

// Budget Store Types
export type BudgetStoreState = {
  budgets: Budget[];
};

export type BudgetStoreActions = {
  addBudget: (budget: Budget) => AsyncOperation<Budget>;
  updateBudget: (updatedBudget: Budget) => AsyncOperation<Budget>;
  deleteBudget: (budgetId: number) => AsyncOperation<Budget>;
  fetchBudgets: () => AsyncOperation<Budget[]>;
};

// Savings Goal Store Types
export type SavingsGoalStoreState = {
  savingsGoals: SavingsGoal[];
};

export type SavingsGoalStoreActions = {
  addSavingsGoal: (goal: SavingsGoal) => AsyncOperation<SavingsGoal>;
  updateSavingsGoal: (updatedGoal: SavingsGoal) => AsyncOperation<SavingsGoal>;
  deleteSavingsGoal: (goalId: number) => AsyncOperation<SavingsGoal>;
  fetchSavingsGoals: () => AsyncOperation<SavingsGoal[]>;
};

// Bill Subscription Store Types
export type BillSubscriptionStoreState = {
  billSubscriptions: BillSubscription[];
};

export type BillSubscriptionStoreActions = {
  addBillSubscription: (bill: BillSubscription) => AsyncOperation<BillSubscription>;
  updateBillSubscription: (updatedBill: BillSubscription) => AsyncOperation<BillSubscription>;
  deleteBillSubscription: (billId: number) => AsyncOperation<BillSubscription>;
  fetchBillSubscriptions: () => AsyncOperation<BillSubscription[]>;
};

// Shopping List Store Types
export type ShoppingListStoreState = {
  shoppingLists: ShoppingList[];
};

export type ShoppingListStoreActions = {
  addShoppingList: (list: ShoppingList) => AsyncOperation<ShoppingList>;
  updateShoppingList: (updatedList: ShoppingList) => AsyncOperation<ShoppingList>;
  deleteShoppingList: (name: string) => AsyncOperation<ShoppingList>;
  fetchShoppingLists: () => AsyncOperation<ShoppingList[]>;
};

