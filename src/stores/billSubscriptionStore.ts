import { create } from 'zustand';
import { BillSubscriptionStoreActions, BillSubscriptionStoreState } from '../types/stores';
import { BillSubscription } from '../types/models';
import { persist } from 'zustand/middleware'


type BillSubscriptionStore = BillSubscriptionStoreState & BillSubscriptionStoreActions

export const useBillSubscriptionStore = create<BillSubscriptionStore>()(persist((set, get) => ({
  billSubscriptions: [],

  fetchBillSubscriptions: async () => {
    try {
      set({ billSubscriptions: [] }); // Clear bill subscriptions before fetch starts
      const response = await new Promise<BillSubscription[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { billId: 1, amount: 50, dueDate: "2024-03-20T15:30:00Z" },
              { billId: 2, amount: 75, dueDate: "2024-04-15T15:30:00Z" },
            ]),
          1000
        )
      );
      set({ billSubscriptions: response });
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  addBillSubscription: async (bill: BillSubscription) => {
    try {
      const response = await new Promise<BillSubscription>((resolve) =>
        setTimeout(() => resolve(bill), 500)
      );
      set((state) => ({ billSubscriptions: [...state.billSubscriptions, response] }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  updateBillSubscription: async (updatedBill: BillSubscription) => {
    try {
      const response = await new Promise<BillSubscription>((resolve) =>
        setTimeout(() => resolve(updatedBill), 500)
      );
      set((state) => ({
        billSubscriptions: state.billSubscriptions.map((bill) =>
          bill.billId === updatedBill.billId ? response : bill
        ),
      }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  deleteBillSubscription: async (billId: number) => {
    try {
      const response = await new Promise<BillSubscription | null>((resolve) =>
        setTimeout(
          () =>
            resolve(
              get().billSubscriptions.find((bill) => bill.billId === billId) ||
                null
            ),
          500
        )
      );
      if (response) {
        set((state) => ({
          billSubscriptions: state.billSubscriptions.filter(
            (bill) => bill.billId !== billId
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