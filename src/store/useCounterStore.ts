
import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface Item {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  details: string;
}
interface ItemStore {
  items: Item[];
  addItem: (newItem: Omit<Item, 'id'>) => void;
  deleteItem: (itemId: 'id') => void;
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
      deleteItem: (itemId ) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId)
      })),
    }),
    {
    name: 'cart-storage',
    }
  )
);
