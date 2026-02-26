import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface User {
  id: string;
  username: string;
  email: string;
}

interface ItemStore {
  items: Item[];
  cart: Citem[];
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  addItem: (newItem: Omit<Item, "id">) => void;
  deleteItem: (itemId: string) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  deleteCart: (itemId: string) => void;
  setItems: (items: Item[]) => void;
  editItem: (itemId: string, updatedData: Partial<Item>) => Promise<void>;
}

export const useCartStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      cart: [],
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null, cart: [] }),

      addItem: async (itemData) => {
        const { token } = get();
        try {
          const res = await fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
      editItem: async (itemId, updatedData) => {
        const { token } = get();
        const res = await fetch(`http://localhost:3000/api/items/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Failed to update item");

        const updatedItem = await res.json();

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, ...updatedItem } : item,
          ),
          cart: state.cart.map((cartItem) =>
            cartItem.id === itemId ? { ...cartItem, ...updatedItem } : cartItem,
          ),
        }));
      },

      setItems: (newItems) => set({ items: newItems }),
      deleteItem: async (itemId) => {
        try {
          await fetch(`http://localhost:3000/api/items/${itemId}`, {
            method: "DELETE",
          });

          set((state) => ({
            items: state.items.filter((item) => item.id !== itemId),
            cart: state.cart.filter((item) => item.id !== itemId),
          }));
        } catch (err) {
          console.error("Delete failed", err);
        }
      },

      addToCart: async (item) => {
        set((state) => {
          const isItemInCart = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          let newCart;

          if (isItemInCart) {
            newCart = state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
            );
          } else {
            newCart = [...state.cart, { ...item, quantity: 1 }];
          }

          fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: newCart }),
          }).catch((err) => console.error("Syncing cart failed:", err));

          return { cart: newCart };
        });
      },

      removeFromCart: (itemId) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === itemId);

          if (existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map((i) =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i,
              ),
            };
          }
          return { cart: state.cart.filter((i) => i.id !== itemId) };
        }),

      deleteCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
    }),
    {
      name: "cart-storage",
    },
  ),
);
