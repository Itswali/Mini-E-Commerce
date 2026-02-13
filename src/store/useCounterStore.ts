
import { create } from 'zustand'

interface CounterState {
  addItem: () => void
  display: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  // addItem:,
  // reset: () => set({ count: 0 }),
}))
