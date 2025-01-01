import { create } from 'zustand'; // Importing  from Zustand
import { SavingsGoalStoreActions, SavingsGoalStoreState, Store } from '../types/stores';
import { SavingsGoal } from '../types/models';
import { persist } from 'zustand/middleware'


type SavingsGoalStore = Store<SavingsGoalStoreActions, SavingsGoalStoreState>
export const useSavingsGoalStore = create  <SavingsGoalStore>()(persist((set, get) => ({
  savingsGoals: [],

  fetchSavingsGoals: async () => {
    try {
      set({ savingsGoals: [] }); // Clear savings goals before fetch starts
      const response = await new Promise<SavingsGoal[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                goalId: 1,
                name: "Emergency Fund",
                targetAmount: 5000,
                currentAmount: 2000,
                dueDate: "2024-12-31T23:59:59Z",
                note: "Save for unexpected expenses",
                color: "green",
                icon: "💰",
              },
              {
                goalId: 2,
                name: "Vacation",
                targetAmount: 3000,
                currentAmount: 1500,
                dueDate: "2024-06-30T23:59:59Z",
                note: "Save for summer vacation",
                color: "blue",
                icon: "✈️",
              },
            ]),
          1000
        )
      );
      set({ savingsGoals: response });
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  addSavingsGoal: async (goal: SavingsGoal) => {
    try {
      const response = await new Promise<SavingsGoal>((resolve) =>
        setTimeout(() => resolve(goal), 500)
      );
      set((state) => ({ savingsGoals: [...state.savingsGoals, response] }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  updateSavingsGoal: async (updatedGoal: SavingsGoal) => {
    try {
      const response = await new Promise<SavingsGoal>((resolve) =>
        setTimeout(() => resolve(updatedGoal), 500)
      );
      set((state) => ({
        savingsGoals: state.savingsGoals.map((goal) =>
          goal.goalId === updatedGoal.goalId ? response : goal
        ),
      }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  deleteSavingsGoal: async (goalId: number) => {
    try {
      const response = await new Promise<SavingsGoal | null>((resolve) =>
        setTimeout(
          () =>
            resolve(
              get().savingsGoals.find((goal) => goal.goalId === goalId) || null
            ),
          500
        )
      );
      if (response) {
        set((state) => ({
          savingsGoals: state.savingsGoals.filter(
            (goal) => goal.goalId !== goalId
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