
import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface Item {
  id: string; // Added for unique identification
  name: string;
  type: string;
  image: string;
  price: number;
  details: string;
}
interface ItemStore {
  items: Item[];
  addItem: (newItem: Omit<Item, 'id'>) => void;
}
export const useCartStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => set((state) => ({
        items: [
          ...state.items,
          {...newItem, id: crypto.randomUUID() },
        ],
      })),
    }),
    {
    name: 'cart-storage',
    }
  )
);
