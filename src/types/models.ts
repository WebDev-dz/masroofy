import { Icons } from "../components/icons";

type BaseEntity = {
    createdAt: string // Iso Format;
    updatedAt: string // Iso Format;
    deletedAt?: string // Iso Format;
  };

// Define the export types
export type Category = {
  name: string;
  icon: keyof typeof Icons;
  theme: string;
  id: string;
  parentId?: string;
  isActive: boolean;
};

export type TransactionType = "income" | "expense" | "transfer";

export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";

export type Currency = {
  code: string;    // ISO 4217 currency code
  symbol: string;
  decimals: number;
};

export type Transaction = BaseEntity & {
  transactionId: number;
  amount: number;
  date: string; // ISO Format
  category: Category;
  tags: string[];
  fromAccountId?: number | null; // The source account for the transaction
  toAccountId?: number | null;  // Optional, for transfers
  type: TransactionType; // Indicates income, expense, or transfer
  status: TransactionStatus;
  description?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
};


export type AccountType = "checking" | "savings" | "credit" | "investment" | "cash";

export type Account = {
  accountId: number;
  balance: number;
  currency: string;
  type: AccountType;
  color: string;
  bankNumber?: string;
  name: string;
  isActive: boolean;
};


export type Period = "One time" | "Month" | "Week" | "Year" 

export type Budget = {
  budgetId: number;
  account: Account;
  period: Period;
  currentAmount: number;
  limit: number;
  category?: Category;
  startDate: string; // ISO format
  endDate?: string; // ISO format
  isRecurring: boolean;
  notifications?: {
    enabled: boolean;
    threshold: number;
  };
};



export type BillSubscription = {
  billId: number;
  amount: number;
  dueDate: string; // ISO format
};

export type SavingsGoal = {
  goalId: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string; // ISO Format
  note: string;
  color: string;
  icon: string
};

export type Report = {
  reportId: number;
  type: 'expense' | 'income' | 'savings' | 'budget';
  filters: Record<string, unknown>;
  dateRange: {
    start: Date;
    end: Date;
  };
  groupBy?: 'day' | 'week' | 'month' | 'year' | 'category';
};

export type SpendingReport = Report & {
  type: 'expense';
  filters: {
    categories?: Category[];
    minAmount?: number;
    maxAmount?: number;
  };
  metrics: {
    totalSpent: number;
    categoryBreakdown: Record<string, number>;
    averagePerDay: number;
  };
};

export type BudgetReport = Report & {
  type: 'budget';
  filters: {
    budgetId: number;
  };
  metrics: {
    plannedVsActual: {
      planned: number;
      actual: number;
      variance: number;
    };
    isOverBudget: boolean;
  };
};

export type ShoppingItem = {
  itemName: string;
  price: number
}


export type ShoppingList = {
  name: string;
  items: ShoppingItem []
}





export type AmountConstraints = {
  min: number;
  max: number;
};

export type ValidatedAmount = number & AmountConstraints;

export type AsyncOperation<T> = Promise<{
  data: T | null;
  loading: boolean;
  error: Error | null;
}>;

export type SavingsReport = Report & {
  type: 'savings';
  filters: {
    goalId?: number;
  };
  metrics: {
    totalSaved: number;
    progressPercentage: number;
    projectedCompletion: Date;
    monthlyAverage: number;
  };
};

