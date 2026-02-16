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

interface Citem extends Item {
  quantity: number;
}

interface ItemStore {
  items: Item[];
  cart: Citem[];
  addItem: (newItem: Omit<Item, 'id'>) => void;
  deleteItem: (itemId: string) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  deleteCart: (itemId: string) => void;
}

export const useCartStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      cart: [],

      addItem: (newItem) => set((state) => ({
        items: [
          ...state.items,
          { ...newItem, id: crypto.randomUUID() },
        ],
      })),

      deleteItem: (itemId) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
        cart: state.cart.filter((item) => item.id !== itemId)
      })),

      addToCart: (item) => set((state) => {
        const isItemInCart = state.cart.find((cartItem) => cartItem.id === item.id);

        if (isItemInCart) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),

      removeFromCart: (itemId) => set((state) => {
        const existingItem = state.cart.find(i => i.id === itemId);

        if (existingItem && existingItem.quantity > 1) {
          return {
            cart: state.cart.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }
        return { cart: state.cart.filter((i) => i.id !== itemId) };
      }),

      deleteCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
