
import { create } from 'zustand'

interface CounterState {
  createItem: () => void
  viewItem: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
}))
