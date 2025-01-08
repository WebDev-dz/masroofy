import { create } from 'zustand';
import { Store, CategoryStoreState, CategoryStoreActions } from '../types/stores';
import { Category } from '../types/models';
import { persist } from 'zustand/middleware'
import { categories } from '../constants';


type CategoryStore = Store<CategoryStoreState, CategoryStoreActions>
export const useCategoryStore = create <CategoryStore>()(persist((set, get) => ({
    categories: categories,
  
    fetchCategories: async () => {
      try {
        set({ categories: categories }); // Clear categories before fetch starts
        const response = await new Promise<Category[]>((resolve) =>
          setTimeout(
            () =>
              resolve([
                { id: "1", name: "Food", icon: "pizza", theme: "red", isActive: false },
                { id: "2", name: "Travel", icon: "airplane", theme: "blue", isActive: true },
              ]),
            1000
          )
        );
        set({ categories: categories });
        return { data: response, loading: false, error: null };
      } catch (error) {
        return { data: null, loading: false, error: error as Error };
      }
    },
  
    addCategory: async (category) => {
      try {
        const response = await new Promise<Category>((resolve) =>
          setTimeout(() => resolve(category), 500)
        );
        set((state) => ({ categories: [...state.categories, response] }));
        return { data: response, loading: false, error: null };
      } catch (error) {
        return { data: null, loading: false, error: error as Error };
      }
    },
  
    updateCategory: async (updatedCategory) => {
      try {
        const response = await new Promise<Category>((resolve) =>
          setTimeout(() => resolve(updatedCategory), 500)
        );
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === updatedCategory.id ? response : category
          ),
        }));
        return { data: response, loading: false, error: null };
      } catch (error) {
        return { data: null, loading: false, error: error as Error };
      }
    },
  
    deleteCategory: async (categoryId) => {
      try {
        const response = await new Promise<Category | null>((resolve) =>
          setTimeout(
            () =>
              resolve(
                get().categories.find((category) => category.id === categoryId) ||
                  null
              ),
            500
          )
        );
        if (response) {
          set((state) => ({
            categories: state.categories.filter(
              (category) => category.id !== categoryId
            ),
          }));
        }
        return { data: response, loading: false, error: null };
      } catch (error) {
        return { data: null, loading: false, error: error as Error };
      }
    },
  }), {
    name: 'category-storage', // Name of the storage 
  }));