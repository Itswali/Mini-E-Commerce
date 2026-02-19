import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Item {
  _id?: string;
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
  setItems: (items: Item[]) => void;
}

export const useCartStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      cart: [],

      addItem: async (itemData) => {
        try {
          const res = await fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
          });
          const savedItem = await res.json();
          if (res.ok) {
            set((state) => ({
              items: [...state.items, { ...savedItem, id: savedItem._id }],
            }));
          }
        } catch (err) {
          console.error("Add item failed", err);
        }
      },

      setItems: (newItems) => set({ items: newItems }),
      deleteItem: async (itemId) => {
  try {
    // 1. Tell the API to delete it from MongoDB
    await fetch(`http://localhost:3000/api/items/${itemId}`, {
      method: 'DELETE'
    });

    // 2. Update the UI (Zustand) only after successful DB deletion
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
      cart: state.cart.filter((item) => item.id !== itemId)
    }));
  } catch (err) {
    console.error("Delete failed", err);
  }
},

      addToCart: async (item) => {
  // 1. Logic to determine the new cart state locally
  set((state) => {
    const isItemInCart = state.cart.find((cartItem) => cartItem.id === item.id);
    let newCart;

    if (isItemInCart) {
      newCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...state.cart, { ...item, quantity: 1 }];
    }

    fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: newCart }),
    }).catch(err => console.error("Syncing cart failed:", err));

    return { cart: newCart };
  });
},

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
