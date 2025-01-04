import {  create } from 'zustand'; // Replace with your actual state management library
import { AccountStoreActions, AccountStoreState } from '../types/stores';
import { Account } from '../types/models';
import { default_accounts } from '../constants/accounts';
import { persist } from 'zustand/middleware'
import { exchangeRates } from "../constants/currencies"

export const useAccountStore = create<AccountStoreState & AccountStoreActions>()(persist((set, get) => ({
  accounts: default_accounts,

  calculateTotalBalance: async () => {
     const calculateTotal = get().accounts.reduce((acc, a) => {
      // @ts-ignore
      return acc + (exchangeRates[a.currency].inverseRate * a.balance)
    }, 0)
    return {data: calculateTotal, loading: false, error: null}

  },

  fetchAccounts: async () => {
    try {
      set({ accounts: [] }); // Clear accounts before fetch starts
      const response = await new Promise<Account[]>((resolve) =>
        setTimeout(
          () =>
            resolve([]),
          1000
        )
      );
      set({ accounts: response });
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  addAccount: async (account: Account) => {
    try {
      const response = await new Promise<Account>((resolve) =>
        setTimeout(() => resolve(account), 500)
      );
      set((state) => ({ accounts: [...state.accounts, response] }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  updateAccount: async (updatedAccount: Account) => {
    try {
      const response = await new Promise<Account>((resolve) =>
        setTimeout(() => resolve(updatedAccount), 500)
      );
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.accountId === updatedAccount.accountId ? response : account
        ),
      }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  deleteAccount: async (accountId: number) => {
    try {
      const response = await new Promise<Account | null>((resolve) =>
        setTimeout(
          () =>
            resolve(
              get().accounts.find((account) => account.accountId === accountId) ||
                null
            ),
          500
        )
      );
      if (response) {
        set((state) => ({
          accounts: state.accounts.filter(
            (account) => account.accountId !== accountId
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