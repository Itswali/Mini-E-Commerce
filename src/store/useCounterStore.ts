
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
  cart: Item[];
  addItem: (newItem: Omit<Item, 'id'>) => void;
  deleteItem: (itemId: 'id') => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
}
export const useCartStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      cart: [],
      addItem: (newItem) => set((state) => ({
        items: [
          ...state.items,
          {...newItem, id: crypto.randomUUID() },
        ],
      })),
      deleteItem: (itemId ) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
      addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
      })),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
    }),
    {
    name: 'cart-storage',
    }
  )
);
