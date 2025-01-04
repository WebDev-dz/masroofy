import {create, } from 'zustand'; // Importing  from Zustand
import { ShoppingListStoreActions, ShoppingListStoreState, Store } from '../types/stores';
import { ShoppingList } from '../types/models';
import { persist } from 'zustand/middleware'


const shoppingListData : ShoppingList[] = [
  {
    name: "Groceries",
    items: [
      { itemName: "Apples", price: 4,  },
      { itemName: "Bread",  price: 2 },
      { itemName: "Milk",  price: 1,  },
    ],
  },
  {
    name: "Electronics",
    items: [
      { itemName: "USB Cable", price: 1 },
      { itemName: "Phone Charger", price: 2,  },
    ],
  },
  {
    name: "Clothing",
    items: [
      { itemName: "T-Shirt", price: 3 },
      { itemName: "Jeans", price: 2 },
    ],
  },
];

type ShoppingListStore = Store<ShoppingListStoreState, ShoppingListStoreActions>
export const useShoppingListStore = create<ShoppingListStore>()(persist((set, get) => ({
  shoppingLists: [],

  fetchShoppingLists: async () => {
    try {
      set({ shoppingLists: [] }); // Clear shopping lists before fetch starts
      const response = await new Promise<ShoppingList[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                name: "Groceries",
                items: [
                  { itemName: "Apples", price: 3 },
                  { itemName: "Bread", price: 2 },
                ],
              },
              {
                name: "Hardware",
                items: [
                  { itemName: "Nails", price: 5 },
                  { itemName: "Hammer", price: 15 },
                ],
              },
            ]),
          1000
        )
      );
      set({ shoppingLists: response });
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  addShoppingList: async (list: ShoppingList) => {
    try {
      const response = await new Promise<ShoppingList>((resolve) =>
        setTimeout(() => resolve(list), 500)
      );
      set((state) => ({ shoppingLists: [...state.shoppingLists, response] }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  updateShoppingList: async (updatedList: ShoppingList) => {
    try {
      const response = await new Promise<ShoppingList>((resolve) =>
        setTimeout(() => resolve(updatedList), 500)
      );
      set((state) => ({
        shoppingLists: state.shoppingLists.map((list) =>
          list.name === updatedList.name ? response : list
        ),
      }));
      return { data: response, loading: false, error: null };
    } catch (error) {
      return { data: null, loading: false, error: error as Error };
    }
  },

  deleteShoppingList: async (name: string) => {
    try {
      const response = await new Promise<ShoppingList | null>((resolve) =>
        setTimeout(
          () =>
            resolve(
              get().shoppingLists.find((list) => list.name === name) || null
            ),
          500
        )
      );
      if (response) {
        set((state) => ({
          shoppingLists: state.shoppingLists.filter(
            (list) => list.name !== name
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