import { Account } from "../types/models";

export enum AccountType {
    CHECKING = "checking",
    SAVINGS = "savings",
    CREDIT_CARD = "credit",
    INVESTMENT = "investment"
}

export const default_accounts: Account[] = [
  {
    accountId: 1,
    balance: 1500.50,
    currency: "USD",
    type: AccountType.CHECKING,
    color: "#007bff", // Blue
    bankNumber: "9876543210",
    name: "My Checking Account",
    isActive: true,
  },
  {
    accountId: 2,
    balance: 5000.00,
    currency: "EUR",
    type: AccountType.SAVINGS,
    color: "#28a745", // Green
    name: "Holiday Savings",
    isActive: true,
  },
  {
    accountId: 3,
    balance: -250.75,
    currency: "GBP",
    type: AccountType.CREDIT_CARD,
    color: "#dc3545", // Red
    bankNumber: "1122334455",
    name: "Everyday Credit Card",
    isActive: false, // Example of an inactive account
  },
];